# Documentação Técnica — API e Aplicação Web de Cálculo de IMC

## 1. Visão Geral do Projeto

O sistema consiste em uma aplicação cliente-servidor para o cálculo e a classificação do Índice de Massa Corporal (IMC). A lógica de cálculo e classificação é centralizada no backend em **Node.js + Express**, enquanto o frontend em **HTML5, CSS3 e JavaScript** coleta os dados do usuário e consome a API via requisições HTTP assíncronas (`fetch`).

* **Arquitetura:** Cliente-Servidor (REST API + Interface Web)
* **Backend:** Node.js, Express (`express`) e middleware de CORS (`cors`)
* **Frontend:** HTML5, CSS3 e JavaScript puro (`fetch` API)
* **Formato de troca de dados:** JSON (`application/json`)

## 2. Regras de Negócio e Fórmula

O backend calcula o IMC a partir do peso em quilogramas ($\text{kg}$) e da altura em metros ($\text{m}$):

$$\text{IMC} = \frac{\text{Peso}}{\text{Altura}^2}$$

As faixas de classificação aplicadas pelo serviço seguem os critérios definidos para o trabalho:

| Intervalo de IMC ($\text{kg/m}^2$) | Classificação Retornada |
| :--- | :--- |
| Menor que `18,5` | `Magreza` |
| Entre `18,5` e `24,9` | `Normal` |
| Entre `24,9` e `30,0` | `Sobrepeso` |
| Maior que `30,0` | `Obesidade` |

### Validações de Entrada no Backend

* `peso` e `altura` devem ser valores numéricos maiores que `0`.
* A `altura` não deve exceder `3.0` metros (evitando preenchimento acidental em centímetros, como `175` em vez de `1.75`).
* Caso os dados sejam inválidos, a API responde com status HTTP `400 Bad Request` e uma mensagem descritiva em `detail`.

## 3. Arquitetura e Fluxo de Comunicação

```text
+-----------------------+          POST /calcular-imc (JSON)          +-----------------------+
|   Frontend (Browser)  | --------------------------------------------> |   Backend (Express)   |
|  frontend/index.html  |                                               |  backend/server.js    |
|                       | <-------------------------------------------- |  Porta: 3000          |
+-----------------------+    200 OK { imc, classificacao, unidade }   +-----------------------+
```

1. O usuário preenche **Peso (kg)** e **Altura (m)** no formulário em `frontend/index.html` e envia o formulário.
2. O JavaScript intercepta o evento `submit`, converte os valores para número e envia um `POST` para `http://127.0.0.1:3000/calcular-imc` com cabeçalho `Content-Type: application/json`.
3. O Express recebe a requisição, valida os campos, calcula o IMC, determina a classificação e retorna o JSON arredondado para duas casas decimais.
4. O frontend exibe o valor formatado (com vírgula decimal) e a classificação na tela ou mostra a mensagem de erro caso ocorra falha.

## 4. Especificação dos Endpoints

### `GET /`

Verifica se o serviço está ativo.

* **Resposta (`200 OK`):**

```json
{
  "status": "API de IMC em execução",
  "endpoint": "POST /calcular-imc"
}
```

### `POST /calcular-imc`

Calcula o IMC e retorna a classificação correspondente.

* **Request Body (`application/json`):**

```json
{
  "peso": 70,
  "altura": 1.75
}
```

* **Response Body (`200 OK`):**

```json
{
  "imc": 22.86,
  "classificacao": "Normal",
  "unidade": "kg/m2"
}
```

* **Response Body de Erro (`400 Bad Request`):**

```json
{
  "detail": "Informe a altura em metros (ex.: 1.75)."
}
```

## 5. Estrutura de Diretórios

```text
imc-api-node/
├── backend/
│   ├── node_modules/       # Dependências (ignorado no Git via .gitignore)
│   ├── package.json        # Metadados e dependências do backend
│   ├── package-lock.json   # Versões exatas resolvidas pelo npm
│   └── server.js           # Servidor HTTP, rotas e regra de cálculo do IMC
├── frontend/
│   └── index.html          # Interface web e integração com a API via fetch
├── docs/
│   └── DOCUMENTACAO_TECNICA.md
├── .gitignore
└── README.md
```

## 6. Guia de Execução e Testes

1. **Subir o backend:**

```bash
cd backend
npm install
npm start
```

2. **Abrir o frontend:**

Abra `frontend/index.html` em um navegador (ou via servidor local / Live Server).

3. **Cenários de teste recomendados:**

* **Magreza:** `peso = 50`, `altura = 1.75` $\rightarrow$ IMC `16.33` (`Magreza`).
* **Normal:** `peso = 70`, `altura = 1.75` $\rightarrow$ IMC `22.86` (`Normal`).
* **Sobrepeso:** `peso = 80`, `altura = 1.75` $\rightarrow$ IMC `26.12` (`Sobrepeso`).
* **Obesidade:** `peso = 100`, `altura = 1.75` $\rightarrow$ IMC `32.65` (`Obesidade`).
* **Entrada inválida:** `altura = 175` $\rightarrow$ retorno HTTP `400` informando que a altura deve ser em metros.

## 7. Identificação do Autor

* **Nome:** Kevin Siqueira de Jesus
* **Contexto:** Trabalho de Pós-Graduação
* **GitHub:** [github.com/Kevin-Siqueira](https://github.com/Kevin-Siqueira)
* **LinkedIn:** [linkedin.com/in/kevin-siqueira-de-jesus](https://www.linkedin.com/in/kevin-siqueira-de-jesus)
