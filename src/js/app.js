var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    function checkIfCnpjAlreadyExists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch("http://localhost:3000/clientes")
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
        });
    }
    function confirmUserUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield checkIfCnpjAlreadyExists()) {
                return window.confirm("Já existem dados atrelados a este CNPJ no nosso sistema, gostaria de atualizá-los?");
            }
            return false;
        });
    }
    function getUserIdByCnpj(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch("http://localhost:3000/clientes")
                .then(response => response.json())
                .then((clientList) => {
                for (const client of clientList) {
                    if (cnpj === client.cnpj) {
                        return client.id;
                    }
                }
                return null;
            });
        });
    }
    function updateUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield getUserIdByCnpj(userData.cnpj);
            if (userId) {
                const response = yield fetch(`http://localhost:3000/clientes/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });
                if (response.ok) {
                    alert("Dados atualizados com sucesso");
                }
                else {
                    alert("Erro ao atualizar os dados");
                }
            }
            else {
                alert("Usuário não encontrado");
            }
        });
    }
    function exportUserDataToApi() {
        return __awaiter(this, void 0, void 0, function* () {
            const cnpjValue = cnpj.value.replace(/[^\d]+/g, '');
            const userData = {
                cnpj: cnpjValue,
                hasCriminalProcesses: inputCriminalModelYes.checked,
                debtLevel: parseInt(inputDebtLevel.value),
                hasUnpaidItems: inputDefaultHistoryYes.checked,
                serasaScore: parseInt(inputSerasaScore.value),
                existenceTime: parseInt(inputExistenceTime.value),
                annualBilling: parseInt(inputAnnualBilling.value),
                financialResult: inputFinancialResultProfit.checked ? "Lucro" : "Prejuizo",
            };
            if (yield confirmUserUpdate()) {
                updateUserData(userData);
            }
            else {
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
        });
    }
    function validateCnpj(cnpj) {
        return cnpj.length === 14;
    }
    function validateDebtLevel(debtLevel) {
        const debtLevelNumber = parseInt(debtLevel);
        return !isNaN(debtLevelNumber) && debtLevelNumber >= 0;
    }
    function validateSerasaScore(serasaScore) {
        const serasaScoreNumber = parseInt(serasaScore);
        return !isNaN(serasaScoreNumber) && serasaScoreNumber >= 0 && serasaScoreNumber <= 1000;
    }
    function validateForm() {
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
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateForm()) {
            exportUserDataToApi();
        }
    });
});
export {};
