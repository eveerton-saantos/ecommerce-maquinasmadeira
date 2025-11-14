const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //A mesma chave usada no Login
        req.user = decoded; // Salva os dados do usuário na requisição
        next(); // Permite acesso à rota
    } catch (error) {
        console.log('Erro ao verificar token:', error.message);
        res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
}

module.exports = verifyToken;