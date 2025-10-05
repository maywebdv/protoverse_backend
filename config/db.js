const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // toujours en haut

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connecté à MongoDB Atlas ✅');
    } catch (error) {
        console.error('Erreur MongoDB:', error.message);
        process.exit(1); // arrête le serveur en cas d'erreur
    }
};

module.exports = connectDB;
