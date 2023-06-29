import { UserData } from "./interfaces/userData";

window.addEventListener("load", () => {
  const cnpj = document.getElementById("cnpj") as HTMLInputElement;
  const inputCriminalModelYes = document.getElementById('inputCriminalModelYes') as HTMLInputElement;
  const inputDebtLevel = document.getElementById('inputDebtLevel') as HTMLInputElement;
  const inputDefaultHistoryYes = document.getElementById('inputDefaultHistoryYes') as HTMLInputElement;
  const inputSerasaScore = document.getElementById('inputSerasaScore') as HTMLInputElement;
  const inputExistenceTime = document.getElementById('inputExistenceTime') as HTMLInputElement;
  const inputAnnualBilling = document.getElementById('inputAnnualBilling') as HTMLInputElement;
  const inputFinancialResultProfit = document.getElementById('inputFinancialResultProfit') as HTMLInputElement;
  const inputFinancialResultLoss = document.getElementById('inputFinancialResultLoss') as HTMLInputElement;

  const form = document.getElementById("form") as HTMLFormElement;

  async function checkIfCnpjAlreadyExistis(): Promise<boolean>{
    return await fetch("http://localhost:3000/clientes")
            .then(response => response.json())
            .then((clientList) => {
              const clientCnpj = cnpj.value
              for(let i in clientList){
                if(clientCnpj === clientList[i].cnpj){
                  return true
                }
              }
              return false
            });
  };


  async function confirmUserUpdate(){

    if(await checkIfCnpjAlreadyExistis()){
      return window.confirm("Ja existem dados atrelados a este CNPJ no nosso sitema, gostaria de atualizá-los ?")
    }
    return false
  }

  async function updateUserData(userData: UserData) {
    const confirmation = await confirmUserUpdate();
    if (confirmation) {
      fetch(`http://localhost:3000/clientes/${userData.cnpj}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Dados atualizados com sucesso");
          } else {
            alert("Erro ao atualizar os dados");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao atualizar os dados");
        });
    }
  }

  async function exportUserDataToApi() {

    const cnpjValue = cnpj.value.replace(/[^\d]+/g, '');

    const userData: UserData = {
      cnpj: cnpjValue,
      hasCriminalProcesses: inputCriminalModelYes.checked,
      debtLevel: parseInt(inputDebtLevel.value),
      hasUnpaidItems: inputDefaultHistoryYes.checked,
      serasaScore: parseInt(inputSerasaScore.value),
      existenceTime: parseInt(inputExistenceTime.value),
      annualBilling: parseInt(inputAnnualBilling.value),
      financialResult: inputFinancialResultProfit.checked ? "Lucro" : "Prejuizo",
    };

    if(await confirmUserUpdate()){
      updateUserData(userData)
    }else{
        fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        })
        .then((response) => {
          if (response.ok) {
            alert("Dados enviados com sucesso");
          } else {
            alert("Erro ao enviar os dados");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao enviar os dados");
        });
    }
  }

  function validateCnpj(cnpj: string): boolean {
    return cnpj.length === 14;
  }

  function validateDebtLevel(debtLevel: string): boolean {
    const debtLevelNumber = parseInt(debtLevel);
    return !isNaN(debtLevelNumber) && debtLevelNumber >= 0;
  }

  function validateSerasaScore(serasaScore: string): boolean {
    const serasaScoreNumber = parseInt(serasaScore);
    return !isNaN(serasaScoreNumber) && serasaScoreNumber >= 0 && serasaScoreNumber <= 1000;
  }


  function validateForm(): boolean {
    const cnpjValue = cnpj.value.replace(/[^\d]+/g, '');

    if (!validateCnpj(cnpjValue)) {
      alert("CNPJ inválido");
      return false;
    }

    const debtLevelValue = inputDebtLevel.value.trim();
    if (!validateDebtLevel(debtLevelValue)) {
      alert("Nível de dívida inválido");
      return false;
    }

    const serasaScoreValue = inputSerasaScore.value.trim();
    if (!validateSerasaScore(serasaScoreValue)) {
      alert("Score do Serasa inválido");
      return false;
    }

    return true;
  }

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    if (validateForm()) {
      exportUserDataToApi();
    }
  });
});
