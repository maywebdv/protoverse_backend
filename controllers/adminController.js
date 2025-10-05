const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getPendingSuppliers,
  validateSupplier,
  getAllOrders,
  getStats
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/suppliers/pending', getPendingSuppliers);
router.put('/suppliers/:id/validate', validateSupplier);
router.get('/orders', getAllOrders);
router.get('/stats', getStats);

module.exports = router;
