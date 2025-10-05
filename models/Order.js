const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  fichier3D: {
    nom: String,
    url: String,
    taille: Number, // en bytes
    format: String // STL, OBJ, etc.
  },
  specifications: {
    materiau: String,
    couleur: String,
    qualite: String, // basse, normale, haute
    remplissage: Number, // pourcentage
    support: Boolean,
    finition: String
  },
  dimensions: {
    x: Number,
    y: Number,
    z: Number,
    unite: { type: String, default: 'mm' }
  },
  quantite: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  prix: {
    materiau: Number,
    impression: Number,
    livraison: Number,
    total: Number
  },
  statut: {
    type: String,
    enum: ['pending_supplier', 'accepted', 'in_production', 'completed', 'cancelled', 'disputed'],
    default: 'pending_supplier'
  },
  delaiEstime: {
    type: Number, // en jours
  },
  dateCommande: {
    type: Date,
    default: Date.now
  },
  dateLivraison: Date,
  notes: String,
  historique: [{
    statut: String,
    date: Date,
    commentaire: String
  }]
});

module.exports = mongoose.model('Order', orderSchema);
