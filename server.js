const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ====================== BANCO SIMULADO ======================
const bancoSimulado = {
    alunos: [
        { id_aluno: 1, nome: "Kaike Cerato", nick: "KSCERATO", id_equipe: 1 },
        { id_aluno: 2, nome: "Yuri Boian", nick: "yuurih", id_equipe: 1 },
        { id_aluno: 3, nome: "Vinicius Storto", nick: "VINI", id_equipe: 1 },
        { id_aluno: 4, nome: "André Sousa", nick: "drop", id_equipe: 1 },
        { id_aluno: 5, nome: "Matheus Santos", nick: "matheus", id_equipe: 1 },
        { id_aluno: 6, nome: "Matheus Santos", nick: "saadhak", id_equipe: 2 },
        { id_aluno: 7, nome: "Bryan Oliveira", nick: "pANIC", id_equipe: 2 },
        { id_aluno: 8, nome: "Gabriel Diniz", nick: "gabs", id_equipe: 2 },
        { id_aluno: 9, nome: "Lucas Oliveira", nick: "aspas", id_equipe: 2 },
        { id_aluno: 10, nome: "Felipe Dias", nick: "croco", id_equipe: 2 }
    ],

    equipes: [
        { id_equipe: 1, nome_equipe: "FURIA", capitão: "Kaike Cerato" },
        { id_equipe: 2, nome_equipe: "LOUD", capitão: "Matheus Santos" }
    ],

    modalidades: [
        { id_modalidade: 1, nome_jogo: "Counter-Strike 2" },
        { id_modalidade: 2, nome_jogo: "Valorant" },
        { id_modalidade: 3, nome_jogo: "League of Legends" },
        { id_modalidade: 4, nome_jogo: "Free Fire" }
    ],

    partidas: [{
        id_partida: "550e8400-e29b-41d4-a716-446655440000",
        id_equipe1: 1,
        id_equipe2: 2,
        id_modalidade: 1,
        data_hora_inicio: 1704067200000,
        data_hora_fim: 1704074400000,
        id_equipe_vencedora: 1
    }]
};

// ====================== MIDDLEWARES ======================
app.use(cors());
app.use(express.json());

// ====================== ROTAS ======================

app.get('/', (req, res) => {
    res.send('API E-Classes rodando com sucesso! 🚀');
});

app.get('/alunos', (req, res) => {
    res.json(bancoSimulado.alunos);
});

app.get('/equipes', (req, res) => {
    res.json(bancoSimulado.equipes);
});

app.get('/modalidades', (req, res) => {
    res.json(bancoSimulado.modalidades);
});

app.get('/partidas', (req, res) => {
    res.json(bancoSimulado.partidas);
});

// ====================== INICIAR SERVIDOR ======================
app.listen(PORT, () => {
    console.log(`✅ API E-Classes rodando em http://localhost:${PORT}`);
});