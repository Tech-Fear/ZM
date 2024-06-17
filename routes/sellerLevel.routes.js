const express=  require('express');
const router=express.Router();
const {getExpiredMedicine,updateMedicineByName,UpdateMedicineExpiryStatus,delteMedicine}=require('../controller/sellerLevel.controller.js');

router.get('/getExpiredMedicine',getExpiredMedicine);
router.put('/updateMedicine/price/:name',updateMedicineByName);
router.put('/updateMedicine/expiryStatus/:name',UpdateMedicineExpiryStatus);
router.delete('/deleteMedicine/:name',delteMedicine);
