const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getSuppliers,
  createOrder,
  getOrders
} = require('../controllers/clientController');

router.use(protect);

router.get('/suppliers', getSuppliers);
router.post('/orders', authorize('client'), createOrder);
router.get('/orders', authorize('client'), getOrders);

module.exports = router;
