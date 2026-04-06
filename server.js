const express = require('express');
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