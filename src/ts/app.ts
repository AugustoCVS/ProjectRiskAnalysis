import { UserData } from "./interfaces/userData";

document.addEventListener("DOMContentLoaded", function () {
  const inputName = document.getElementById("inputName") as HTMLInputElement;
  const inputEmail = document.getElementById("inputEmail") as HTMLInputElement;
  const inputAge = document.getElementById("inputAge") as HTMLInputElement;
  const inputCivil = document.getElementById("inputCivil") as HTMLInputElement;
  const inputCpfOuCnpj = document.getElementById("inputCpfOuCnpj") as HTMLInputElement;

  // finance data
  const inputMonthlyIncome = document.getElementById("inputMonthlyIncome") as HTMLInputElement;
  const inputCreditLimit = document.getElementById("inputCreditLimit") as HTMLInputElement;
  const inputIncomeSources = document.getElementById("inputIncomeSources") as HTMLInputElement;
  const inputMonthlyExpenses = document.getElementById("inputMonthlyExpenses") as HTMLInputElement;
  const inputDebtLevel = document.getElementById("inputDebtLevel") as HTMLInputElement;
  const inputPaymentHistory = document.getElementById("inputPaymentHistory") as HTMLInputElement;
  const inputDefaultHistory = document.getElementById("inputDefaultHistory") as HTMLInputElement;

  // job data
  const inputJob = document.getElementById("inputJob") as HTMLInputElement;
  const inputTypeOfJob = document.getElementById("inputTypeOfJob") as HTMLInputElement;

  // Company data
  const inputActivityField = document.getElementById("inputActivityField") as HTMLInputElement;
  const inputExistenceTime = document.getElementById("inputExistenceTime") as HTMLInputElement;
  const inputAnnualIncome = document.getElementById("inputAnnualIncome") as HTMLInputElement;
  const inputResult = document.getElementById("inputResult") as HTMLInputElement;
  const btnInputAnalysis = document.getElementById("btnInputAnalysis") as HTMLButtonElement;

  const form = document.getElementById("form") as HTMLFormElement;

  function exportUserDataToApi() {

    const userData: UserData = {
      name: inputName.value,
      email: inputEmail.value,
      age: parseInt(inputAge.value),
      maritalStatus: inputCivil.value,
      cpf: inputCpfOuCnpj.value,
      monthlyIncome: parseFloat(inputMonthlyIncome.value),
      creditLimit: parseFloat(inputCreditLimit.value),
      incomeSources: [inputIncomeSources.value],
      monthlyExpenses: parseFloat(inputMonthlyExpenses.value),
      debtLevel: parseFloat(inputDebtLevel.value),
      paymentHistory: inputPaymentHistory.value,
      defaultHistory: inputDefaultHistory.value,
      occupation: inputJob.value,
      employmentType: inputTypeOfJob.value,
      businessArea: inputActivityField.value,
      existenceYears: inputExistenceTime.value,
      annualRevenue: inputAnnualIncome.value,
      financialResult: inputResult.value,
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
  }

//   fetch("http://localhost:3000/clientes")
//     .then(response => response.json())
//     .then(data => console.log(data[5].name))

  form.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    exportUserDataToApi();
  });
});
