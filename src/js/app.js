document.addEventListener("DOMContentLoaded", function () {
    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    const inputAge = document.getElementById("inputAge");
    const inputCivil = document.getElementById("inputCivil");
    const inputCpfOuCnpj = document.getElementById("inputCpfOuCnpj");
    // finance data
    const inputMonthlyIncome = document.getElementById("inputMonthlyIncome");
    const inputCreditLimit = document.getElementById("inputCreditLimit");
    const inputIncomeSources = document.getElementById("inputIncomeSources");
    const inputMonthlyExpenses = document.getElementById("inputMonthlyExpenses");
    const inputDebtLevel = document.getElementById("inputDebtLevel");
    const inputPaymentHistory = document.getElementById("inputPaymentHistory");
    const inputDefaultHistory = document.getElementById("inputDefaultHistory");
    // job data
    const inputJob = document.getElementById("inputJob");
    const inputTypeOfJob = document.getElementById("inputTypeOfJob");
    // Company data
    const inputActivityField = document.getElementById("inputActivityField");
    const inputExistenceTime = document.getElementById("inputExistenceTime");
    const inputAnnualIncome = document.getElementById("inputAnnualIncome");
    const inputResult = document.getElementById("inputResult");
    const btnInputAnalysis = document.getElementById("btnInputAnalysis");
    const form = document.getElementById("form");
    function exportUserDataToApi() {
        const userData = {
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
            }
            else {
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
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        exportUserDataToApi();
    });
});
export {};
