const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.static(__dirname + '/pages'));
app.use(express.json());
app.use(cors());

const Produto = require('./models/Produto');

app.get('/produto/:id', async (req, res) => {
    const produtoId = req.params.id;
    const produto = await Produto.findById(produtoId);

    if (!produto) {
        return res.status(404).send("Produto não encontrado!");
    }

    res.json(produto);
});

app.get('/product.html', (req, res) => {
    res.sendFile(__dirname + './product.html');
});

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Conectado ao MongoDB"))
.catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rota teste
app.get('/', (req, res) => {
    res.send("🚀 API rodando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Rota para listar todos os produtos
app.get('/produtos', async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
});

app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, frete, imagem } = req.body;

    const produtoAtualizado = await Produto.findByIdAndUpdate(id, { nome, descricao, preco, frete, imagem }, { new: true });
    
    res.json({ message: 'Produto atualizado!', produto: produtoAtualizado });
});

// Rota para criar um novo produto
app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco, frete, imagem } = req.body;
    const novoProduto = new Produto({ nome, descricao, preco, frete, imagem });
    await novoProduto.save();
    res.json({ message: 'Produto criado!', produto: novoProduto });
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    await Produto.findByIdAndDelete(id);
    res.json({ message: 'Produto excluído!' });
});