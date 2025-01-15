const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Users API escutando na ${port}`);
});

const db = [
    {
        id: 1,
        titulo: 'Paulinho o louco assalto ao banco',
        autor: 'Doe',
        editora: 'paulo',
        ano: 2025,
        quant: 0,
        preco: 200.0
    },
    {
        id: 2,
        titulo: 'Os Bruzundangas',
        autor: 'Doe',
        editora: 'paulo', 
        ano: 1922,
        quant: 100,
        preco: 10.0
    },
    {
        id: 3,
        titulo: 'Paulinho Golpe Lamborghini',
        autor: 'Doe',
        editora: 'cleber',
        ano: 2022,
        quant: 5,
        preco: 155.0
    },

];

app.get("/livros", (req, res) => {
    res.json(db);
});

// encontrar livro pelo id
app.get("/livros/:id", (req, res) => {
    const user = db.find(u => u.id === parseInt(req.params.id));
    res.json(user);
});

// encontrar livros pela editora
app.get("/livros/editora/:editora", (req, res) => {
    const livro = db.filter(l => l.editora == req.params.editora);
    res.json(livro);
});

// encontrar livros por palavra chave
app.get("/livros/titulo/:pchave", (req, res) => {
    const pchave = req.params.pchave.toLowerCase()
    const livro = db.filter(l => l.titulo.toLowerCase().includes(pchave));
    res.json(livro);
});

// encontrar livros mais caros
app.get("/livros/preco/maior-que/:valor", (req, res) => {
    const valor = parseFloat(req.params.valor)
    const livro = db.filter(l => l.preco >= valor)
    res.json(livro)
});

// encontrar livros mais baratos
app.get("/livros/preco/menor-que/:valor", (req, res) => {
    const valor = parseFloat(req.params.valor)
    const livro = db.filter(l => l.preco <= valor)
    res.json(livro)
});

// não entendi se era p limitar a busca a uma data, entao preferi
// só organizar o db dos mais recentes aos mais antigos pois 
// é o que mais faria sentido numa busca
app.get("/livros/lancamento/recentes", (req, res) => {
    const livro = db
    livro.sort((a, b) => b.ano - a.ano);
    res.json(livro)
});

// mesma coisa mas ao contrario
app.get("/livros/lancamento/antigos", (req, res) => {
    const livro = db
    livro.sort((a, b) => a.ano - b.ano);
    res.json(livro)
});

app.get("/livros/estoque/:numero", (req, res) => {
    const numero = parseInt(req.params.numero)
    const livro = db.filter(l => l.quant === numero); // Use === para comparação
    res.json(livro);
});