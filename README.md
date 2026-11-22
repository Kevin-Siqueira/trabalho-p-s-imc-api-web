```Markdown
# Calculadora de IMC com API REST

Aplicação web full-stack desenvolvida para o cálculo e classificação do Índice de Massa Corporal (IMC), conectando um frontend em HTML, CSS e JavaScript a uma API REST construída com Node.js e Express.

## Fórmula e Classificações

O cálculo realizado pelo backend segue a fórmula:

$$\text{IMC} = \frac{\text{Peso (kg)}}{\text{Altura (m)}^2}$$

| Faixa de IMC ($\text{kg/m}^2$) | Classificação |
| :--- | :--- |
| Menor que `18,5` | Magreza |
| Entre `18,5` e `24,9` | Normal |
| Entre `24,9` e `30,0` | Sobrepeso |
| Maior que `30,0` | Obesidade |

## Estrutura do Projeto

```text
.
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   └── index.html
└── README.md
```

Pré-requisitos
Node.js (versão 18 ou superior)

Navegador web atualizado

Como Executar
1. Iniciar o Backend (API)
Acesse a pasta backend, instale as dependências e inicie o servidor:

```Bash
cd backend
npm install
npm start
```
A API ficará disponível em http://127.0.0.1:3000.

2. Abrir o Frontend
Acesse a pasta frontend.

Abra o arquivo index.html diretamente no navegador (ou utilize uma extensão como o Live Server no VS Code).

Informe o Peso (kg) e a Altura (m) e clique em Calcular IMC.

Endpoint da API
POST /calcular-imc
Corpo da requisição (application/json):

```JSON
{
  "peso": 70,
  "altura": 1.75
}
```
Resposta de sucesso (200 OK):

```JSON
{
  "imc": 22.86,
  "classificacao": "Normal",
  "unidade": "kg/m2"
}
```
## Documentação Técnica

Para detalhes sobre arquitetura, regras de negócio, contrato dos endpoints e cenários de teste, acesse a [Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md).
