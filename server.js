const express = require("express");
require("dotenv").config();

const { Pool } = require("pg");

const app = express();

const PORT = process.env.PORT || 3000;

const message = process.env.MESSAGE || "Deploy funcionando!";

// conexão PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// rota principal
app.get("/", (req, res) => {
    res.send(`
        <h1>Servidor Express no Render</h1>
        <p>${message}</p>
    `);
});

// rota api
app.get("/api", (req, res) => {
    res.json({
        mensagem: "API funcionando",
        status: "online"
    });
});

// rota banco de dados
app.get("/database", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "Banco conectado",
            horario: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});