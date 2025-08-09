const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login',loginUser);

router.get('/', authMiddleware, getUsers);
module.exports = router;