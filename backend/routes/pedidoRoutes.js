const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Pedido = require('../models/Pedido');


//Criar novo pedido
router.post('/pedidos', verifyToken, async (req, res) => {
    try {
        const { produtos, total } = req.body;

        const novoPedido = new Pedido({
            usuario: req.user.userId,
            produtos,
            total
        });
        
    await novoPedido.save();
    res.status(201).json({ message: 'Pedido criado com sucesso!', pedido: novoPedido});
    } catch (error) {
        console.error('Erro ao criar pedido', error);
        res.status(500).json({ message: 'Erro interno ao criar pedido.'});
    }
});

// Listar pedidos do usuário logado
router.get('/meus-pedidos', verifyToken, async (req, res) => {
    try {
        const pedidos = await Pedido.find({ usuario: req.user.userId }).populate('produto.produtoId');
        res.json(pedidos);
    } catch {
        console.error('Error ao buscar pedidos:', error);
        res.status(500).json({ message: 'Erro interno ao buscar pedidos.' });
    }
})

module.exports = router;