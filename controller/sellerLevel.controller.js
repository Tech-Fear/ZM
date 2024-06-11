const express=require('express');
const router=express.Router();
const Medicine=require('../schema/medicine.model.js');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/getExpiredMedicine',async(req,res)=>{
  try{
    const medicines=await Medicine.find({isExpired:true}).sort({expiry:1});
    if(medicines.length===0) return res.status(404).json({message:'No expired medicines found'});
    res.status(200).json(medicines);
  }catch(err){
    res.status(500).json({message:'Internal server error'});
  }
})
router.update('/updateMedicineExpiryStatus',async(req,res)=>{
  try{
    const medicines=await Medicine.find({expiry:{$lt:new Date()}});
    if(medicines.length===0) return res.status(404).json({message:'No expired medicines found'});
    medicines.forEach(async medicine=>{
      medicine.isExpired=true;
    })
    await Promise.all(medicines.map(medicine=>medicine.save()));
    res.status(200).json({message:'Medicines expiry status updated successfully'});
  }catch(err){
    res.status(500).json({message:'Internal server error'});
    console.log(err.message);
  }
})

module.exports=router;


