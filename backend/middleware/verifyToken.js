const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nem um Token encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); //A mesma chave usada no Login
        req.user = decoded; // Salva os dados do usuário na requisição
        next(); // Permite acesso à rota
    } catch (err) {
        res.status(403).json({ message: 'Token inválido ou expirado.' })
    }
}

module.exports = verifyToken;