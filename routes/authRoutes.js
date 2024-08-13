// routes/authRoutes.js
const express = require('express');
const {registerUser, loginUser, getUserData} = require('../controllers/authController');
const {registerValidation, validate, loginValidation} = require("../middlewares/authValidationMiddleware");
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.get('/user/me', protect, getUserData);

module.exports = router;
