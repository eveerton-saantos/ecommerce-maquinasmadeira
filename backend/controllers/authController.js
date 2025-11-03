const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'E-mail ou Senha inválido!'})
        }

        // Compara a senha com o Hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'E-mail ou Senha Inválido!'})
        }

        // Gera o Token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'your_secret_key', //SUBSTITUIR POR UMA CHAVE SEGURA EM PRODUÇÃO
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login foi um sucesso', token});

    } catch (error) {
        console.error('Erro no login', error);
        res.status(500).json({ message: 'Erro no Servidor durante o Login'})
    }
}

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        // Verifica se o email já está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está cadastrado!' });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Cria o usuário com a senha segura
        const newUser = new User({
            name,
            email,
            password: passwordHash,
            role: role || 'client'
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

        } catch (error) {
            console.error('Erro interno ao registrar usuário:', error);
            res.status(500).json({ message: 'Erro interno ao registrar usuário!' });
    }

}

module.exports = { loginUser, registerUser };
