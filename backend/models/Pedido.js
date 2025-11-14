const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    produtos: [
        {
        produtoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto',
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            default: 1
        }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'processando', 'enviado', 'entregue'],
        default: 'pendente'
    },
    dataPedido: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pedido', pedidoSchema);