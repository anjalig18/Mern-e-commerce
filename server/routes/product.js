const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
  // getProductById // Uncomment if you implement this
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
// router.get('/:id', getProductById); // Uncomment if you implement this

// Product management routes (now public)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router; 