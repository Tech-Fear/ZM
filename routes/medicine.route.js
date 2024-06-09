const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicine.controller.js');

router.use('/medicine', medicineController);

module.exports = router;
