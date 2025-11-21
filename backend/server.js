const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'Public')));
app.use(express.static(__dirname + '/pages'));
app.use(express.json());
app.use(cors());

// Rotas
const authRoutes = require('./routes/authRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes');
const ListaDesejosRoutes = require('./routes/listaDesejosRoutes')
const userRoutes = require('./routes/userRoutes');

// const jwtSecret = process.env.JWT_SECRET;
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/lista-desejos', ListaDesejosRoutes);
app.use('/api/usuarios', userRoutes);

// Página estática
app.get('/product.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'product.html'));
});

// Fallback
app.get('/', (req, res) => {
    res.send("API rodando!");
});

// Fallback Rotas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.'});
});

// Middleware de erro interno
app.use((err, req, res, next) => {
    console.error('Erro interno:', err);
    res.status(500).json({ error: 'Erro interno! Rota não encontrada.' });
});

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce_db', {
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar MongoDB:", err));

// Inicialização
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));