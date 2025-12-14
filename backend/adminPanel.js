// Backend do adminPanel
const express = require('express');
const router = express.Router();
const Produto = require('../backend/models/Produto'); // Modelo do MongoDB

// =========== ROTAS DO ADMIN =============

// Criar produto
router.post('/produtos', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.json({ message: 'Produto criado com sucesso!', produto});
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar produtos', detalhe: err.message });
    }
});

// Listar produtos
router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar produtos', detalhe: err.message });
    }
});

// Atualizar produto (PUT - edição completa)
router.put('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Produto atualizado com sucesso!', produto });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar produto', detalhe: err.message });
    }
});

// Atualizar campos específicos (PATCH - destaque/express)
router.patch('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ mensagem: 'Produto modificado com sucesso!', produto });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao modificar produto', detalhe: err.message });
    }
});

// Deletar produto
router.delete('/produtos/:id', async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.json({ mensagem: 'Produto excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao excluir produto', detalhe: err.message });
    }
});

module.exports = router;