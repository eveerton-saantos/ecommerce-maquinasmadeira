const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/ecommerce_db');

const createAdmin = async () => {
    const email = 'admin@maquinasmadeira.com';
    const password = 'admin123';

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
        console.log('Admin já existe com esse email.');
        mongoose.disconnect();
        return;
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
        name: 'Administrador',
        email,
        password: hashedPassword,
        role: 'admin'
    });

    await admin.save();
    console.log('Administrador criado com sucesso!');
    mongoose.disconnect();
};

createAdmin();
