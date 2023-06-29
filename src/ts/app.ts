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

  async function checkIfCnpjAlreadyExists(): Promise<boolean> {
    return await fetch("http://localhost:3000/clientes")
      .then(response => response.json())
      .then((clientList) => {
        const clientCnpj = cnpj.value;
        for (const client of clientList) {
          if (clientCnpj === client.cnpj) {
            return true;
          }
        }
        return false;
      });
  }

  async function confirmUserUpdate(): Promise<boolean> {
    if (await checkIfCnpjAlreadyExists()) {
      return window.confirm("Já existem dados atrelados a este CNPJ no nosso sistema, gostaria de atualizá-los?");
    }
    return false;
  }

  async function getUserIdByCnpj(cnpj: string): Promise<string | null> {
    return await fetch("http://localhost:3000/clientes")
      .then(response => response.json())
      .then((clientList) => {
        for (const client of clientList) {
          if (cnpj === client.cnpj) {
            return client.id;
          }
        }
        return null;
      });
  }

  async function updateUserData(userData: UserData) {
    const userId = await getUserIdByCnpj(userData.cnpj);
    if (userId) {
      const response = await fetch(`http://localhost:3000/clientes/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("Dados atualizados com sucesso");
      } else {
        alert("Erro ao atualizar os dados");
      }
    } else {
      alert("Usuário não encontrado");
    }
  }

  async function exportUserDataToApi() {
    const userData: UserData = {
      cnpj: cnpj.value,
      hasCriminalProcesses: inputCriminalModelYes.checked,
      debtLevel: parseInt(inputDebtLevel.value),
      hasUnpaidItems: inputDefaultHistoryYes.checked,
      serasaScore: parseInt(inputSerasaScore.value),
      existenceTime: parseInt(inputExistenceTime.value),
      annualBilling: parseInt(inputAnnualBilling.value),
      financialResult: inputFinancialResultProfit.checked ? "Lucro" : "Prejuizo",
    };

    if (await confirmUserUpdate()) {
      updateUserData(userData);
    } else {
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
