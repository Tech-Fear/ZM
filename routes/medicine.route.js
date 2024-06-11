const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicine.controller.js');
const sellerLevelController = require('../controller/sellerLevel.controller.js');

router.use('/medicine', medicineController);
router.use('/sellerLevel', sellerLevelController);
module.exports = router;
