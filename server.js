const express = require('express');
// ============================================
// SIMULAÇÃO DO BANCO DE DADOS - E-LASSES
// Coloque este ARRAY no início da sua API
// ============================================

const bancoSimulado = {
    // Tabela Alunos
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

    // Tabela Equipe
    equipes: [
        { id_equipe: 1, nome_equipe: "FURIA", capitão: "Kaike Cerato" },
        { id_equipe: 2, nome_equipe: "LOUD", capitão: "Matheus Santos" }
    ],

    // Tabela Modalidade
    modalidades: [
        { id_modalidade: 1, nome_jogo: "Counter-Strike 2" },
        { id_modalidade: 2, nome_jogo: "Valorant" },
        { id_modalidade: 3, nome_jogo: "League of Legends" },
        { id_modalidade: 4, nome_jogo: "Free Fire" }
    ],

    // Tabela Partida
    partidas: [{
        id_partida: "550e8400-e29b-41d4-a716-446655440000",
        id_equipe1: 1,
        id_equipe2: 2,
        id_modalidade: 1,
        data_hora_inicio: 1704067200000,
        data_gora_fim: 1704074400000,
        id_equipe_vencedora: 1
    }],

    // Tabela Disputam
    disputam: [
        { id_equipe: 1, id_partida: "550e8400-e29b-41d4-a716-446655440000" },
        { id_equipe: 2, id_partida: "550e8400-e29b-41d4-a716-446655440000" }
    ],

    // Tabela Participam
    participam: [
        { id_equipe: 1, id_modalidade: 1 },
        { id_equipe: 1, id_modalidade: 2 },
        { id_equipe: 2, id_modalidade: 1 },
        { id_equipe: 2, id_modalidade: 2 }
    ],

    // Tabela Possuem
    possuem: [
        { id_partida: "550e8400-e29b-41d4-a716-446655440000", id_modalidade: 1 }
    ]
};

const app = express();
const PORT = 3000;

app.use(express.json());

// "Banco de dados" fake (array)
let users = [
    { id: 1, name: "João", email: "joao@email.com" },
    { id: 2, name: "Maria", email: "maria@email.com" },
    { id: 3, name: "Pedro", email: "pedro@email.com" }
];

// 🔹 Rota raiz
app.get('/', (req, res) => {
    res.send(`Bem vindo a API e-classes, existem ${users.length} usuários!`);
});

// 🔹 GET usuários (suporte a query params ?name=)
app.get('/users', (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(u =>
            u.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filteredUsers);
    }

    res.json(users);
});

// 🔹 POST (criar usuário)
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// 🔹 PUT (atualizar usuário)
app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// 🔹 DELETE (remover usuário)
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    users.splice(index, 1);

    res.json({ message: "Usuário removido com sucesso" });
});

// 🚀 Inicia servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});