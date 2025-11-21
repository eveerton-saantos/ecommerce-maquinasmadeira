const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

// Buscar dados do usuário
router.get('/me', verifyToken, async (req, res) => {
try {
    const user = await User.findById(req.user.userId).select('name email');
    res.json(user);
} catch (error) {
    console.error('Erro ao buscar perfil: ', error);
    res.status(500).json({ message: 'Erro ao buscar perfil.' });
    }
});

// Atualizar dados do usuário
router.put('/me', verifyToken, async (req, res) => {
try {
    const { name, email } = req.body;

    const emailExistente = await User.findOne({ email});
    if (emailExistente && emailExistente._id.toString() !== req.user.userId) {
        return res.status(400).json({ message: 'Este email já está em uso por outro usuário.'});
    }

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email },
        { new: true }
    );
    
    res.json({ message: 'Perfil atualizado com sucesso!', user });
} catch (error) { 
    console.error('Erro ao atualizar o perfil: ', error);
    res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
    }
});

module.exports = router;