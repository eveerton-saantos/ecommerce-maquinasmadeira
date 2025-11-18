const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const ListaDesejos = require('../models/ListaDesejos');


// Adicionar produto à Lista de Desejos
router.post('/lista-desejos', verifyToken, async (req, res) => {

    try {
        let lista = await ListaDesejos.findOne({ usuario: req.user.userId });

        if (!lista) {
            lista = new ListaDesejos({ usuario: req.user.userId, produtos: [produtoId] });
        } else {
            if (!lista.produtos.includes(produtoId)) {
                lista.produtos.push(produtoId);
            }
        }

        await lista.save();
        res.json({ message: 'Produto adicionado à lista de desejos!', lista });
    } catch (error) {
        console.log('Error ao adicionar à lista:', error);
        res.status(500).json({ message: 'Erro interno ao adicionar à lista.' });
    }
});

// Busca na Lista de Desejos
router.get('/lista-desejos', verifyToken, async (req, res) => {
    try {
        const lista = await ListaDesejos.findOne({ usuario: req.user.userId }).populate('produtos');
        res.json(lista || { produtos: [] });
    } catch (error) {
        console.error('Erro ao buscar lista:', error);
        res.status(500).json({ message: 'Erro interno ao buscar lista. ' });
    }
});

// Remover lista de Desejos
router.delete('lista-desejos/:produtosId', verifyToken, async (req, res) => {
try {
    const lista = await ListaDesejos.findOne({ usuario: req.user.userId });

    if (!lista) {
        lista.produtos = lista.produtos.filter(p => p.toString() !== req.params.produtosId);
        await lista.save();
    }

    res.json({ message: 'Produto removido da lista de desejos!' });
    } catch (error) {
        console.error('Erro ao remover produto: ', error);
        res.status(500).json({ message: 'Erro interno ao remover produto.' });
    }

});

module.exports = router;