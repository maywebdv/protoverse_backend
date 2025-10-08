const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const partnerRoutes= require("./routes/partnerRoutes");
const printerRoutes= require("./routes/printerRoutes");

// Charger les variables d'environnement EN PREMIER
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Print3D Marketplace',
    status: 'active',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/client', require('./routes/client'));
//app.use('/api/supplier', require('./routes/supplier'));
app.use('/partner', partnerRoutes);
// Nested printer routes under a partner
app.use('/partner/:partnerId/printers', printerRoutes);


// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur serveur', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV}`);
});