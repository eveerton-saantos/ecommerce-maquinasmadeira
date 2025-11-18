const mongoose = require('mongoose');

const listaDesejosSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    produtos: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
        }
    ]
});

module.exports = mongoose.model('ListaDesejos', listaDesejosSchema);