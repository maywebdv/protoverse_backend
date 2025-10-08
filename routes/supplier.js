const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getOrders,
  acceptOrder
} = require('../controllers/supplierController');

router.use(protect);
router.use(authorize('supplier'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/orders', getOrders);
router.put('/orders/:id/accept', acceptOrder);

module.exports = router;
