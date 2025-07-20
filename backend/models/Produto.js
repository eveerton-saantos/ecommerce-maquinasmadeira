const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    preco: Number,
    frete: Number,
    imagem: String,
    highlight: { type: Boolean, default: false },
    express: { type: Boolean, default: false },
    codigo: { type: String, required: true },
    voltagem: String,
    estoque: Number
});

module.exports = mongoose.model('Produto', produtoSchema);