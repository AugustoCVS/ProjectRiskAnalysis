document.addEventListener('DOMContentLoaded', () => {
  let result: number = 0;

  const divAnalysisResult = document.getElementById("divAnalysisResult") as HTMLDivElement;
  const userCnpj = document.getElementById("userCnpj") as HTMLInputElement;
  const formGetAnalysis = document.getElementById("formGetAnalysis") as HTMLFormElement;

  async function getDataFromApi(apiKey: string): Promise<any> {
    const response = await fetch(apiKey);
    return response.json();
  }

  async function confirmIfCnpjExists(cnpj: string): Promise<boolean> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        return true;
      }
    }
    return false;
  }

  async function criminalAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.hasCriminalProcesses === true) {
          result = 0;
          return;
        }
      }
    }
  }

  async function debtLevelAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.debtLevel > 10) {
          result = 0;
        } else if (client.debtLevel <= 10 && client.debtLevel >= 6) {
          result += 5;
        } else if (client.debtLevel <= 5 && client.debtLevel >= 1) {
          result += 15;
        } else if (client.debtLevel < 5) {
          result += 20;
        }
        return;
      }
    }
  }

  async function defaultHistoryAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.hasCriminalProcesses === true) {
          result = 0;
          return;
        }
      }
    }
  }

  async function scoreSerasaAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.serasaScore <= 300) {
          result = 0;
        } else if (client.serasaScore > 300 && client.serasaScore <= 500) {
          result += 5;
        } else if (client.serasaScore > 500 && client.serasaScore <= 700) {
          result += 15;
        } else if (client.serasaScore > 700 && client.serasaScore <= 1000) {
          result += 25;
        }
        return;
      }
    }
  }

  async function existenceTimeAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.existenceTime < 2) {
          result += 3;
        } else if (client.existenceTime >= 3 && client.existenceTime <= 5) {
          result += 5;
        } else if (client.existenceTime >= 6 && client.existenceTime <= 9) {
          result += 10;
        } else if (client.existenceTime > 10) {
          result += 15;
        }
        return;
      }
    }
  }

  async function annualBillingAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.annualBilling < 300000) {
          result = 0;
        } else if (client.annualBilling >= 300000 && client.annualBilling <= 4800000) {
          result += 10;
        } else if (client.annualBilling > 4800000 && client.annualBilling <= 12000000) {
          result += 20;
        } else if (client.annualBilling > 12000000) {
          result += 25;
        }
        return;
      }
    }
  }

  async function financialResultAnalysis(cnpj: string): Promise<void> {
    const clientList = await getDataFromApi("http://localhost:3000/clientes");
    for (const client of clientList) {
      if (cnpj === client.cnpj) {
        if (client.financialResult === 'Lucro') {
          result += 15;
        }
        return;
      }
    }
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

  function fullyFit(){
    divAnalysisResult.innerHTML = `
    <li class="result level-s">
        <strong>S: Totalmente Apto</strong>
        <p>
        Os clientes classificados como S atendem a todos os critérios de avaliação e possuem uma pontuação alta o suficiente para serem considerados totalmente aptos para operar no adiantamento de recebíveis. São clientes de baixo risco e alta elegibilidade.
        </p>
    </li>
    `;
  }

  function setResult(){
    if (result <= 20) {
      unfitToOperate();
    } else if (result > 20 && result <= 40) {
      lowTrust();
    } else if (result > 40 && result <= 60) {
      averageTrust();
    } else if (result > 60 && result <=80) {
      highTrust();
    }else if(result > 80 && result <= 100){
        fullyFit();
    }
  }

  async function executeAnalysisResultToUser(cnpjValue: string): Promise<void>{
    await criminalAnalysis(cnpjValue);
    await debtLevelAnalysis(cnpjValue);
    await defaultHistoryAnalysis(cnpjValue);
    await scoreSerasaAnalysis(cnpjValue);
    await existenceTimeAnalysis(cnpjValue);
    await annualBillingAnalysis(cnpjValue);
    await financialResultAnalysis(cnpjValue);
  }

  formGetAnalysis.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cnpjValue = userCnpj.value.replace(/[^\d]+/g, '');

    if (cnpjValue.length !== 14) {
      alert("Por favor, insira um CNPJ válido.");
      return;
    }

    const cnpjExists = await confirmIfCnpjExists(cnpjValue);
    if (!cnpjExists) {
      alert("CNPJ não encontrado.");
      return;
    }

    await executeAnalysisResultToUser(cnpjValue)
    setResult()
    
  });
});
