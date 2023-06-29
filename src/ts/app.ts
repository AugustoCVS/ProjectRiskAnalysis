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

  function exportUserDataToApi() {
    const userData: UserData = {
      cnpj: cnpj.value,
      hasCriminalProcesses: inputCriminalModelYes.checked,
      debtLevel: inputDebtLevel.value,
      hasUnpaidItems: inputDefaultHistoryYes.checked,
      serasaScore: parseInt(inputSerasaScore.value),
      existenceTime: parseInt(inputExistenceTime.value),
      annualBilling: parseInt(inputAnnualBilling.value),
      financialResult: inputFinancialResultProfit.checked ? "Lucro" : "Prejuizo",
    };

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
  };

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    exportUserDataToApi();
  });
});
