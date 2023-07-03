"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    let result = 0;
    const divAnalysisResult = document.getElementById("divAnalysisResult");
    const userCnpj = document.getElementById("userCnpj");
    const formGetAnalysis = document.getElementById("formGetAnalysis");
    function getDataFromApi(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(apiKey);
            return response.json();
        });
    }
    function confirmIfCnpjExists(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    return true;
                }
            }
            return false;
        });
    }
    function criminalAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.hasCriminalProcesses === true) {
                        result = 0;
                        return;
                    }
                }
            }
        });
    }
    function debtLevelAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.debtLevel > 10) {
                        result = 0;
                    }
                    else if (client.debtLevel <= 10 && client.debtLevel >= 6) {
                        result += 5;
                    }
                    else if (client.debtLevel <= 5 && client.debtLevel >= 1) {
                        result += 15;
                    }
                    else if (client.debtLevel < 5) {
                        result += 20;
                    }
                    return;
                }
            }
        });
    }
    function defaultHistoryAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.hasCriminalProcesses === true) {
                        result = 0;
                        return;
                    }
                }
            }
        });
    }
    function scoreSerasaAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.serasaScore <= 300) {
                        result = 0;
                    }
                    else if (client.serasaScore > 300 && client.serasaScore <= 500) {
                        result += 5;
                    }
                    else if (client.serasaScore > 500 && client.serasaScore <= 700) {
                        result += 15;
                    }
                    else if (client.serasaScore > 700 && client.serasaScore <= 1000) {
                        result += 25;
                    }
                    return;
                }
            }
        });
    }
    function existenceTimeAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.existenceTime < 2) {
                        result += 3;
                    }
                    else if (client.existenceTime >= 3 && client.existenceTime <= 5) {
                        result += 5;
                    }
                    else if (client.existenceTime >= 6 && client.existenceTime <= 9) {
                        result += 10;
                    }
                    else if (client.existenceTime > 10) {
                        result += 15;
                    }
                    return;
                }
            }
        });
    }
    function annualBillingAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.annualBilling < 300000) {
                        result = 0;
                    }
                    else if (client.annualBilling >= 300000 && client.annualBilling <= 4800000) {
                        result += 10;
                    }
                    else if (client.annualBilling > 4800000 && client.annualBilling <= 12000000) {
                        result += 20;
                    }
                    else if (client.annualBilling > 12000000) {
                        result += 25;
                    }
                    return;
                }
            }
        });
    }
    function financialResultAnalysis(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientList = yield getDataFromApi("http://localhost:3000/clientes");
            for (const client of clientList) {
                if (cnpj === client.cnpj) {
                    if (client.financialResult === 'Lucro') {
                        result += 15;
                    }
                    return;
                }
            }
        });
    }
    function unfitToOperate() {
        divAnalysisResult.innerHTML = `
      <li class="result  level-d">
        <strong>D: Inapto para operar</strong>
        <p>
          Os clientes classificados como D não atendem a maioria dos critérios de avaliação ou possuem uma pontuação muito baixa. São considerados inaptos para operar no adiantamento de recebíveis devido a um risco elevado ou falta de elegibilidade.
        </p>
      </li>
    `;
    }
    function lowTrust() {
        divAnalysisResult.innerHTML = `
      <li class="result  level-c">
        <strong>C: Baixo</strong>
        <p>
          Os clientes classificados como C não atendem a uma quantidade significativa de critérios de avaliação ou possuem uma pontuação baixa. Apresentam um risco maior e podem ter restrições para operar no adiantamento de recebíveis.
        </p>
      </li>
    `;
    }
    function averageTrust() {
        divAnalysisResult.innerHTML = `
      <li class="result  level-b">
        <strong>B: Médio</strong>
        <p>
          Os clientes classificados como B atendem a alguns critérios de avaliação, porém possuem uma pontuação intermediária. Embora tenham potencial para o adiantamento de recebíveis, podem apresentar um risco moderado que requer maior análise e consideração.
        </p>
      </li>  
    `;
    }
    function highTrust() {
        divAnalysisResult.innerHTML = `
      <li class="result level-a">
        <strong>A: Alto</strong>
        <p>
          Os clientes classificados como A atendem a maioria dos critérios de avaliação e possuem uma pontuação significativa. Apesar de não alcançarem o nível máximo de elegibilidade, eles ainda são considerados clientes de alto potencial para o adiantamento de recebíveis.
        </p>
      </li>
    `;
    }
    function fullyFit() {
        divAnalysisResult.innerHTML = `
    <li class="result level-s">
        <strong>S: Totalmente Apto</strong>
        <p>
        Os clientes classificados como S atendem a todos os critérios de avaliação e possuem uma pontuação alta o suficiente para serem considerados totalmente aptos para operar no adiantamento de recebíveis. São clientes de baixo risco e alta elegibilidade.
        </p>
    </li>
    `;
    }
    formGetAnalysis.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const cnpjValue = userCnpj.value.replace(/[^\d]+/g, '');
        if (cnpjValue.length !== 14) {
            alert("Por favor, insira um CNPJ válido.");
            return;
        }
        const cnpjExists = yield confirmIfCnpjExists(cnpjValue);
        if (!cnpjExists) {
            alert("CNPJ não encontrado.");
            return;
        }
        yield criminalAnalysis(cnpjValue);
        yield debtLevelAnalysis(cnpjValue);
        yield defaultHistoryAnalysis(cnpjValue);
        yield scoreSerasaAnalysis(cnpjValue);
        yield existenceTimeAnalysis(cnpjValue);
        yield annualBillingAnalysis(cnpjValue);
        yield financialResultAnalysis(cnpjValue);
        if (result <= 20) {
            unfitToOperate();
        }
        else if (result > 20 && result <= 40) {
            lowTrust();
        }
        else if (result > 40 && result <= 60) {
            averageTrust();
        }
        else if (result > 60 && result <= 80) {
            highTrust();
        }
        else if (result > 80 && result <= 100) {
            fullyFit();
        }
    }));
});
