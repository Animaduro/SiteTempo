const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

// SERVIR ARQUIVOS ESTÁTICOS DA PASTA PUBLIC
app.use(express.static("public"));

// Cidades que o professor pediu
const cidades = [
  { nome: "São Paulo", query: "Sao Paulo" },
  { nome: "Damasco", query: "Damascus" },
  { nome: "Bangladesh", query: "Dhaka" }
];

// Rota principal da API
app.get("/clima", async (req, res) => {
  try {
    const resultados = [];

    for (let cidade of cidades) {
      const url = `https://wttr.in/${cidade.query}?format=j1`;
      const response = await axios.get(url);
      const data = response.data.current_condition[0];

      resultados.push({
        cidade: cidade.nome,
        temperatura_atual: data.temp_C + " °C",
        maxima: response.data.weather[0].maxtempC + " °C",
        minima: response.data.weather[0].mintempC + " °C",
        vento: data.windspeedKmph + " km/h",
        descricao: data.weatherDesc[0].value
      });
    }

    res.json(resultados);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ erro: "Erro ao buscar dados do clima" });
  }
});

// IMPORTANTE: para o frontend funcionar com rotas no Express, envie o index.html para qualquer rota não tratada
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

