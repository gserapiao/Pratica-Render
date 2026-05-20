const express = require("express");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const message =
    process.env.MESSAGE ||
    "Deploy funcionando!";

app.get("/", (req, res) => {
    res.send(`
        <h1>Servidor Express no Render</h1>
        <p>${message}</p>
    `);
});

app.get("/api", (req, res) => {
    res.json({
        mensagem: "API funcionando",
        status: "online"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
