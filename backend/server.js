const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../backend/routes/authRoutes');
const Produto = require('./models/Produto');
const protectedRoutes =require('./routes/authRoutes');
const jwtSecret = process.env.JWT_SECRET;

const pedidosRoutes = require('./routes/pedidoRoutes');
const app = express();

app.use(express.static(__dirname + '/pages'));
app.use(express.json());
app.use(cors());
app.use('/api', pedidosRoutes);

app.get('/product.html', (req, res) => {
    res.sendFile(__dirname + './product.html');
});

mongoose.connect('mongodb://localhost:27017/ecommerce_db', {
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar MongoDB:", err));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send("🚀 API rodando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

app.get('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado!' });
        }
        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro ao buscar produto.' });
    }
});

app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, frete, imagem, express, highlight } = req.body;

    const produtoAtualizado = await Produto.findByIdAndUpdate(id, { nome, descricao, preco, frete, imagem, express, highlight }, { new: true });
    
    res.json({ message: 'Produto atualizado!', produto: produtoAtualizado });
});

app.patch('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, update, { new: true });
        res.json({ message: 'Produto atualizado com sucesso (PATCH)', produto: produtoAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
});

app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco, frete, imagem, highlight, express, codigo, voltagem, estoque } = req.body;

    try {
        const novoProduto = new Produto({ nome, descricao, preco, frete, imagem, highlight, express, codigo, voltagem, estoque });
        await novoProduto.save();
        res.json({ message: 'Produto criado!', produto: novoProduto });
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        res.status(500).json({ error: 'Erro ao salvar produto' });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    await Produto.findByIdAndDelete(id);
    res.json({ message: 'Produto excluído!' });
});

app.use('/api', protectedRoutes);