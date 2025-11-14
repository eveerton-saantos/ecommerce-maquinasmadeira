const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User.js');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('name email role');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ message: `Bem-vindo ${user.name}!`, email: user.email, role: user.role });
    } catch (err) {
        console.log('Erro ao buscar usuário', err);
        res.status(500).json({ message: 'Erro interno ao carregar Dashboard' });
    }
});

module.exports = router;