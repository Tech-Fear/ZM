const express = require('express');
const { signup, login, logout, getSellers } = require('../controller/SellerAuth.controller.js');

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getSellers',getSellers);

module.exports = router;
