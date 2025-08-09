const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, checkout  } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/remove', authMiddleware, removeFromCart);
router.post('/checkout', authMiddleware, checkout); // Checkout

module.exports = router;