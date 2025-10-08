const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for nested params
const {
  addPrinter,
  updatePrinter,
  deletePrinter
} = require('../controllers/printerController');

// Add a new printer to a specific partner
router.post('/', addPrinter); 

// Update / delete printer by printer ID
router.put('/:printerId', updatePrinter);
router.delete('/:printerId', deletePrinter);

module.exports = router;
