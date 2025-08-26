async function carregarClima() {
  try {
    const response = await fetch("http://localhost:3000/clima");
    const dados = await response.json();

    const container = document.getElementById("clima-container");
    container.innerHTML = "";

    dados.forEach(cidade => {
      const div = document.createElement("div");
      div.className = "cidade";
      div.innerHTML = `
        <h2>${cidade.cidade}</h2>
        <p><strong>Temperatura atual:</strong> ${cidade.temperatura_atual}</p>
        <p><strong>Mínima:</strong> ${cidade.minima}</p>
        <p><strong>Máxima:</strong> ${cidade.maxima}</p>
        <p><strong>Vento:</strong> ${cidade.vento}</p>
        <p><strong>Descrição:</strong> ${cidade.descricao}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar clima:", error);
    document.getElementById("clima-container").innerText = "Erro ao carregar clima.";
  }
}

carregarClima();
