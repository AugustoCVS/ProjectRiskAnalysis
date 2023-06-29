window.addEventListener("load", () => {
    const cnpj = document.getElementById("cnpj");
    const inputCriminalModelYes = document.getElementById('inputCriminalModelYes');
    const inputDebtLevel = document.getElementById('inputDebtLevel');
    const inputDefaultHistoryYes = document.getElementById('inputDefaultHistoryYes');
    const inputSerasaScore = document.getElementById('inputSerasaScore');
    const inputExistenceTime = document.getElementById('inputExistenceTime');
    const inputAnnualBilling = document.getElementById('inputAnnualBilling');
    const inputFinancialResultProfit = document.getElementById('inputFinancialResultProfit');
    const inputFinancialResultLoss = document.getElementById('inputFinancialResultLoss');
    const form = document.getElementById("form");
    function exportUserDataToApi() {
        const userData = {
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
    ;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        exportUserDataToApi();
    });
});
export {};
