const express = require('express');
const router = express.Router();
const MedicineDetails = require('../schema/medicineDetails.model.js');
const MedicineSellerInfo = require('../schema/medicineSellerInfo.model.js');
const Seller = require('../schema/seller.model.js')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Authentication middleware
const authenticateSeller = async (req, res, next) => {
  const sellerId = req.headers['seller-id'];
  if (!sellerId) {
    return res.status(401).json({ message: 'Unauthorized: No seller ID provided' });
  }

  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(401).json({ message: 'Unauthorized: Invalid seller ID' });
    }
    if (!isSellerValid) {
      return res.status(401).json({ message: 'Unauthorized: Invalid seller ID' });
    }

    req.sellerId = sellerId;
    next();
  } catch (err) {
    console.error('Error authenticating seller:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Add medicine at seller level

// const addMedicine=(authenticateSeller, async (req, res) => {
//   try{
//     const {name,price,quantity,expiry}=req.body;
//     const medicine=await MedicineDetails.findOne({name});
//   }
// })




// Get expired medicines for a specific seller
const getExpiredMedicine=(authenticateSeller, async (req, res) => {
  try {
    const medicines = await MedicineSellerInfo.find({ seller: req.sellerId, isExpired: true }).sort({ expiry: 1 });
    if (medicines.length === 0) return res.status(404).json({ message: 'No expired medicines found' });
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update Price of Medicine at Seller Level
const updateMedicineByName=(authenticateSeller, async (req, res) => {
  try {
    const name = req.params.name.trim().toLowerCase();
    if (name === '') {
      return res.status(400).json({ message: 'Please enter a valid name' });
    }

    const medicineDetails = await MedicineDetails.findOne({ name });
    if (!medicineDetails) {
      return res.status(404).json({ message: 'Medicine not found, recheck the name' });
    }

    const medicineSellerInfo = await MedicineSellerInfo.findOne({ medicineId: medicineDetails._id, seller: req.sellerId });
    if (!medicineSellerInfo) {
      return res.status(404).json({ message: 'Seller has not listed this medicine' });
    }

    medicineSellerInfo.price = req.body.price;
    await medicineSellerInfo.save();
    res.status(200).json({ message: 'Price updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update the expiry status of medicines for a specific seller
const UpdateMedicineExpiryStatus=(authenticateSeller, async (req, res) => {
  try {
    const expiredMedicines = await MedicineSellerInfo.find({ seller: req.sellerId, expiry: { $lt: new Date() } });
    if (expiredMedicines.length === 0) return res.status(404).json({ message: 'No expired medicines found' });

    const updatePromises = expiredMedicines.map(async (medicine) => {
      medicine.isExpired = true;
      return medicine.save();
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Medicines expiry status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete Medicine at Seller Level
const delteMedicine=( authenticateSeller, async (req, res) => {
  try {
    const name = req.params.name.trim().toLowerCase();
    if (name === '') {
      return res.status(400).json({ message: 'Please enter a valid name' });
    }

    const medicineDetails = await MedicineDetails.findOne({ name });
    if (!medicineDetails) {
      return res.status(404).json({ message: 'Medicine not found in database' });
    }

    const medicineSellerInfo = await MedicineSellerInfo.findOne({ medicineId: medicineDetails._id, seller: req.sellerId });
    if (!medicineSellerInfo) {
      return res.status(404).json({ message: 'Seller has not listed this medicine' });
    }

    await medicineSellerInfo.remove();
    res.status(200).json({ message: 'Medicine removed from seller database' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = {getExpiredMedicine,updateMedicineByName,UpdateMedicineExpiryStatus,delteMedicine};


// const express = require('express');
// const router = express.Router();
// const MedicineDetails = require('../schema/medicine.model.js');
// const MedicineSellerInfo=('../schema/medicineSellerManageable.model.js');
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// // Get expired medicines
// router.get('/getExpiredMedicine', async (req, res) => {
//   try {
//     const medicines = await MedicineSellerInfo.find({ isExpired: true }).sort({ expiry: 1 });
//     if (medicines.length === 0) return res.status(404).json({ message: 'No expired medicines found' });
//     res.status(200).json(medicines);
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// });


// //Update Price of Medicine at Seller Level

// router.put('/updateMedicine/price/:name', async (req, res) => {
//   try {
//       const name = req.params.name.trim().toLowerCase();
//       if (name === '') {
//           return res.status(400).json({ message: 'Please enter a valid name' });
//       }
//       const medicine = await MedicineSellerInfo.findOne({medicineId:(await MedicineDetails.findOne({ name }))._id});
//       if (!medicine) {
//           return res.status(404).json({ message: 'Medicine not found, recheck the name' });
//       }
//       medicine.price = req.body.price;
//       await medicine.save();
//       res.status(200).json({ message: 'Price updated successfully' });
//   } catch (err) {
//       res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// });

// // Update the expiry status of medicines
// router.put('/updateMedicineExpiryStatus', async (req, res) => { 
//   try {
//     const expiredMedicines = await Medicine.find({ expiry: { $lt: new Date() } });
//     if (expiredMedicines.length === 0) return res.status(404).json({ message: 'No expired medicines found' });

//     const updatePromises = expiredMedicines.map(async (medicine) => {
//       medicine.isExpired = true;
//       return medicine.save();
//     });

//     await Promise.all(updatePromises);

//     res.status(200).json({ message: 'Medicines expiry status updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// });
// // Delete Medicine at seller Level

// router.delete('/deleteMedcine/:name',async (req,res)=>{
//     try{
//       const Name=req.params.name.trim().toLowerCase()
//       if(Name==='') return res.status(400).json({ message: 'Please enter a valid name' });
//       const medicine = await MedicineDetails.findOne({name:Name})
//       if(!medicine){
//         return res.status(409).json({message:'Medicine not in  database'})
//       }
//       const MedicineInSeller=await MedicineSellerInfo.findOne({medicineId:medicine._id})
//       await MedicineInSeller.remove();
//       res.status(200).json({message:"Medicine removed from seller database"});
//     }catch(err){
//       res.status(500).json({ message: 'Internal server error', error: err.message });
//     }
// })
// module.exports = router;
