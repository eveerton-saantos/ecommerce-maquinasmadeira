const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        // Verifica se o email está cadastrado
        const foundUser = await User.findOne({ email });
        if(!foundUser) {
            return res.status(401).json({ message: 'E-mail ou Senha inválido!'});
        }

        // Compara a senha com o Hash
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'E-mail ou Senha Inválido!'});
        }

        // Garantimos que o usuário logue após criar a conta
        const payload = {
            userId: foundUser._id,
            role: foundUser.role, 
            email: foundUser.email
        };

        // Gera o Token JWT
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json(
            { message: 'Login foi um sucesso', token}
        );

    } catch (error) {
        console.error('Erro no login', error);
        res.status(500).json({ message: 'Erro no Servidor durante o Login'});
    }
}

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        // Validação básica dos campos obrigatórios
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.'})
        }

        // Validação de força miníma da senha
        if (!password.length < 8) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caractéres.'});
        }

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
        res.status(201).json(
            { message: 'Usuário registrado com sucesso!' }
        );

        } catch (error) {
            console.error('Erro interno ao registrar usuário:', error);
            res.status(500).json(
                { message: 'Erro interno ao registrar usuário!' }
            );
    }

}

module.exports = { loginUser, registerUser };
