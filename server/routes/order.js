const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  getOrderById
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/place', authMiddleware, placeOrder);
router.get('/my', authMiddleware, getUserOrders);
router.get('/all', authMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, updateOrderStatus);
router.put('/:id/cancel', authMiddleware, (req, res, next) => {
  console.log('Cancel order route hit:', {
    method: req.method,
    url: req.url,
    params: req.params,
    body: req.body
  });
  next();
}, cancelOrder);
router.delete('/:id', authMiddleware, deleteOrder);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router; 