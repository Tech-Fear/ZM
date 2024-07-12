const express = require('express');
const router = express.Router();
const {addMedicine,getMedicines,getMByName,getByCategory,getByType,getByManufacturer,getBySalt,deleteByName} = require('../controller/Medicine/medicine.controller.js');

router.post('/addMedicine', addMedicine);
router.get('/getMedicines', getMedicines);
router.get('/getMedicineName/:name', getMByName);
router.get('/getByCategory/:category', getByCategory);
router.get('/getByType/:type', getByType);
router.get('/getByManufacturer/:manufacturer', getByManufacturer);
router.get('/getBySalt/:salt', getBySalt);
router.delete('/deleteByName/:name', deleteByName);

module.exports = router;
