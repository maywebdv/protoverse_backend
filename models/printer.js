const mongoose = require('mongoose');

//schema of the printer, dependent to the partner 
const printerSchema=new mongoose.Schema({
   partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['FDM', 'SLA', 'SLS'],
    required: true
  },
  volumeMax: {
    x: Number,
    y: Number,
    z: Number
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports =mongoose.model('Printer', printerSchema);
