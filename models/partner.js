const mongoose = require('mongoose');


//schema for the supplier (partner) independently from the 3d printer's details
const partnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  nomEntreprise: {
    type: String,
    trim: true
  },
  statut: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'suspended'], 
    default: 'pending' 
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports =mongoose.model('partner', partnerSchema);


