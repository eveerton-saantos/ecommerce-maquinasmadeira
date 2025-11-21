const express = require('express');
const router = express.Router();
const Produto = require("../models/Produto");

// Busca todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

// Busca produto por ID
router.get('/:id', async (req, res) => {
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

// Cria novo produto
router.post('/', async (req, res) => {
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

// Atualiza produto (PUT)
router.put('/:id', async (req, res) => {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true} );
        if (!produtoAtualizado) {
            return res.status(404).json({ message: 'Produto não encontrado! '});
        }
        res.json({ message: 'Produto atualizado com sucesso!', produto: produtoAtualizado});
    } catch (error) {
        console.error('Erro ao atualizar produto: ', error);
        res.status(500).json({ message: 'Erro interno ao atualizar produto.'});
    }
});

// Atualização parcial (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produtoAtualizado) {
            return res.status(404).json({ message: ' Produto não encontrado!' });
        }
        res.json({ message: 'Produto atualizado com sucesso (PATCH)', produto: produtoAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
});

// Deleta produto
router.delete('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
        res.json({ message: 'Produto excluído!' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir o produto.'});
    }
});

module.exports = router;