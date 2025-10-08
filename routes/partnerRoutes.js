const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const {
  addPartner,
  updatePartner,
  deletePartner,
  getPartner
} = require('../controllers/partnerController');

//router.use(protect);
//router.use(authorize('supplier'));

// Create a new partner
router.post('/', addPartner);

// Get / update / delete a partner by ID
router.get('/:id', getPartner);
router.put('/:id', updatePartner);
router.delete('/:id', deletePartner);

module.exports = router;
