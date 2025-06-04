const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/recover-password', authController.recoverPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
