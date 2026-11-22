const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function classificarIMC(imc) {
  if (imc < 18.5) {
    return "Magreza";
  } else if (imc <= 24.9) {
    return "Normal";
  } else if (imc <= 30.0) {
    return "Sobrepeso";
  } else {
    return "Obesidade";
  }
}

app.get("/", (req, res) => {
  res.json({ status: "API de IMC em execução", endpoint: "POST /calcular-imc" });
});

app.post("/calcular-imc", (req, res) => {
  const { peso, altura } = req.body;

  if (typeof peso !== "number" || typeof altura !== "number" || peso <= 0 || altura <= 0) {
    return res.status(400).json({
      detail: "Informe valores numéricos positivos para 'peso' (kg) e 'altura' (m)."
    });
  }

  if (altura > 3.0) {
    return res.status(400).json({
      detail: "Informe a altura em metros (ex.: 1.75)."
    });
  }

  const imcCalculado = peso / (altura * altura);
  const imcArredondado = Number(imcCalculado.toFixed(2));
  const classificacao = classificarIMC(imcCalculado);

  return res.json({
    imc: imcArredondado,
    classificacao,
    unidade: "kg/m2"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js a correr em http://127.0.0.1:${PORT}`);
});