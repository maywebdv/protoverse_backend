const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nomEntreprise: {
    type: String,
    required: [true, 'Le nom de l\'entreprise est requis'],
    trim: true
  },
  siret: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  imprimantes: [{
    modele: String,
    type: String, // FDM, SLA, SLS, etc.
    volumeMax: {
      x: Number,
      y: Number,
      z: Number
    }
  }],
  materiaux: [{
    type: String,
    nom: String
  }],
  tarifHoraire: {
    type: Number,
    default: 0
  },
  delaiMoyen: {
    type: Number, // en jours
    default: 7
  },
  statut: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  documentsVerification: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],
  noteMoyenne: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  nombreAvis: {
    type: Number,
    default: 0
  },
  disponible: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);