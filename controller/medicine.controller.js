const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const MedicineDetails = require('../schema/medicineDetails.model.js');
const MedicineSellerInfo = require('../schema/medicineSellerInfo.model.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//jwt decode to get seller id
function func(){
    const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token provided. Unauthorized' });
        }

        let sellerId;
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            sellerId = decodedToken.userId;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token. Unauthorized' });
        }
    return sellerId;
}

// Add a new medicine and its seller information
const addMedicine=async (req, res) => {
    try {
        const salts = req.body.salt.split(',').map(salt => salt.trim().toLowerCase());
        if (req.body.expiry < new Date()) {
            return res.status(400).json({ message: 'Expired Medicine cannot be inserted. Please check the expiry date' });
        }
        if (salts.length === 0 || salts.includes('')) {
            return res.status(400).json({ message: 'Please enter a valid salt' });
        }
        const medicineExists = await MedicineDetails.findOne({
            name:req.body.name.trim().toLowerCase(),
            manufacturer:req.body.manufacturer.trim().toLowerCase(),
            salt:{$all:salts}
        })
        var medicine;
        if(!medicineExists){
         medicine = new MedicineDetails({
            name: req.body.name.trim().toLowerCase(),
            salt: salts,
            manufacturer: req.body.manufacturer.trim().toLowerCase(),
            type: req.body.type,
            description: req.body.description.trim(),
            category: req.body.category,
        });
        await medicine.save();
        }
        const sellerId=func();
        if(medicineExists){
                medicine=await MedicineDetails.findOne({
                name:req.body.name.trim().toLowerCase(),
                manufacturer:req.body.manufacturer.trim().toLowerCase()
            })
        }
        const existingSellerMedicine = new MedicineSellerInfo.findOne({
            medicineId:medicine._id,
            seller:sellerId,
            expiry:req.body.expiry
        })
        if(existingSellerMedicine){
            return res.status(409).json({message:'Seller has already listed this medicine with the same expiry date. Please update the quantity instead.'})
        }
        const medicineSellerInfo = new MedicineSellerInfo({
            medicineId: medicine._id,
            sellerId:sellerId,
            price: req.body.price,
            quantity: req.body.quantity,
            expiry: req.body.expiry,
            isSellable: req.body.isSellable,
            isExpired: req.body.isExpired,
            sellCount: req.body.sellCount,
            isSold: req.body.isSold,
            seller: req.body.seller
            });
        await medicineSellerInfo.save();
        
        res.status(201).json({ message: 'Medicine added successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

// Get all medicines
const getMedicines=async (req, res) => {
    try {
        const medicines = await MedicineDetails.find({}).sort({ name: 1 });
        if (medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found' });
        }
        res.status(200).json(medicines);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get medicine by name
const getMByName=async (req, res) => {
    try {
        const name = req.params.name.trim().toLowerCase();
        if (name === '') {
            return res.status(400).json({ message: 'Please enter a valid name' });
        }
        const medicine = await MedicineDetails.find({ name });
        if (medicine.length === 0) {
            return res.status(404).json({ message: 'Medicine not found, recheck the name' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get medicine by category
const getByCategory= async (req, res) => {
    try {
        const category = req.params.category.trim().toLowerCase();
        if (category === '') {
            return res.status(400).json({ message: 'Please enter a valid category' });
        }
        const medicine = await MedicineDetails.find({ category });
        if (medicine.length === 0) {
            return res.status(404).json({ message: 'Medicine not found, recheck the category' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get medicine by type
const getByType=async (req, res) => {
    try {
        const type = req.params.type.trim().toLowerCase();
        if (type === '') {
            return res.status(400).json({ message: 'Please enter a valid type' });
        }
        const medicine = await MedicineDetails.find({ type });
        if (medicine.length === 0) {
            return res.status(404).json({ message: 'Medicine not found, recheck the type' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get medicine by manufacturer
const getByManufacturer=async (req, res) => {
    try {
        const manufacturer = req.params.manufacturer.trim().toLowerCase();
        if (manufacturer === '') {
            return res.status(400).json({ message: 'Please enter a valid manufacturer' });
        }
        const medicine = await MedicineDetails.find({ manufacturer });
        if (medicine.length === 0) {
            return res.status(404).json({ message: 'Medicine not found, recheck the manufacturer' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get medicine by salt
const getBySalt=async (req, res) => {
    try {
        const salts = req.params.salt.split(',').map(salt => salt.trim().toLowerCase());
        if (salts.length === 0 || salts.includes('')) {
            return res.status(400).json({ message: 'Please enter a valid salt' });
        }
        const medicine = await MedicineDetails.find({ salt: { $in: salts } });
        if (medicine.length === 0) {
            return res.status(404).json({ message: 'Medicine not found, recheck the salts' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Delete medicine by name
const deleteByName= async (req, res) => {
    try {
        const name = req.params.name.trim().toLowerCase();
        if (name === '') {
            return res.status(400).json({ message: 'Please enter a valid name' });
        }
        const medicine = await MedicineDetails.findOne({ name });
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found, recheck the name' });
        }
        await MedicineSellerInfo.deleteMany({ medicineId: medicine._id });
        await medicine.remove();
        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = {addMedicine,getMedicines,getMByName,getByCategory,getByType,getByManufacturer,getBySalt,deleteByName};



// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const Medicine = require('../schema/medicine.model.js');
// const MedicineSellerInfo=('../schema/medicineSellerManageable.model.js')
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// router.post('/addMedicine', async (req, res) => {
//     try {
//         const salts=req.body.salt.split(',').map(salt=>salt.trim().toLowerCase());
//         if(req.body.expiry<new Date()) return res.status(400).json({message:'Expired Medicine cannot be inserted. Please check the expiry date'})
//         if (salts.length === 0 || salts.includes('')) {
//             return res.status(400).json({ message: 'Please enter a valid salt' });
//         }
//         const medicine = new Medicine({
//             name: req.body.name,
//             price: req.body.price,
//             salt: salts,
//             manufacturer: req.body.manufacturer,
//             type: req.body.type,
//             quantity: req.body.quantity,
//             description: req.body.description,
//             category: req.body.category,
//             expiry: req.body.expiry,
//             isSellable: req.body.isSellable,
//             isExpired: req.body.isExpired,
//             sellCount: req.body.sellCount,
//             isSold: req.body.isSold,
//         });
//         await medicine.save();
//         res.status(201).json({ message: 'Medicine added successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/getMedicine', async (req, res) => {
//     try {
//         const medicines = await Medicine.find({}).sort({ name: 1 });
//         if(medicines.length === 0) return res.status(404).json({ message: 'No medicines found' });
//         res.status(200).json(medicines);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/getMedicine/Name/:name', async (req, res) => {
//     try {
//         const name = req.params.name.trim().toLowerCase();
//         if (name === '') {
//             return res.status(400).json({ message: 'Please enter a valid name' });
//         }
//         const medicine = await Medicine.find({ name });
//         if (medicine.length === 0) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the name' });
//         }
//         res.status(200).json(medicine);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/getMedicine/Category/:category', async (req, res) => {
//     try {
//         const category = req.params.category.trim().toLowerCase();
//         if (category === '') {
//             return res.status(400).json({ message: 'Please enter a valid category' });
//         }
//         const medicine = await Medicine.find({ category });
//         if (medicine.length === 0) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the category' });
//         }
//         res.status(200).json(medicine);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/getMedicine/Type/:type', async (req, res) => {
//     try {
//         const type = req.params.type.trim().toLowerCase();
//         if (type === '') {
//             return res.status(400).json({ message: 'Please enter a valid type' });
//         }
//         const medicine = await Medicine.find({ type });
//         if (medicine.length === 0) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the type' });
//         }
//         res.status(200).json(medicine);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/getMedicine/Manufacturer/:manufacturer', async (req, res) => {
//     try {
//         const manufacturer = req.params.manufacturer.trim().toLowerCase();
//         if (manufacturer === '') {
//             return res.status(400).json({ message: 'Please enter a valid manufacturer' });
//         }
//         const medicine = await Medicine.find({ manufacturer });
//         if (medicine.length === 0) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the manufacturer' });
//         }
//         res.status(200).json(medicine);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// router.get('/getMedicine/salt/:salt',async(req,res)=>{
//     try{
//         const salts=req.params.salts.split(',').map(salt=>salt.trim().toLowerCase());
//         if(salts.lenght===0 || salt.includes('')){
//             return res.status(400).json({message:'Please enter a valid salt'});
//         }
//         const medicine=await Medicine.find({salt:{$in:salts}});
//         if(medicine.length===0){
//             return res.status(404).json({message:'Medicine not found, recheck the salts'});
//         }
//         res.status(200).json(medicine);
//     }catch(err){
//         res.status(500).json({message:'Internal server error'});
//     }
// })

// router.put('/updateMedicine/quantity/:name', async (req, res) => {
//     try {
//         const name = req.params.name.trim().toLowerCase();
//         if (name === '') {
//             return res.status(400).json({ message: 'Please enter a valid name' });
//         }
//         const medicine = await Medicine.findOne({ name });
//         if (!medicine) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the name' });
//         }
//         medicine.quantity = req.body.quantity;
//         await medicine.save();
//         res.status(200).json({ message: 'Quantity updated successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.put('/updateMedicine/price/:name', async (req, res) => {
//     try {
//         const name = req.params.name.trim().toLowerCase();
//         if (name === '') {
//             return res.status(400).json({ message: 'Please enter a valid name' });
//         }
//         const medicine = await Medicine.findOne({ name });
//         if (!medicine) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the name' });
//         }
//         medicine.price = req.body.price;
//         await medicine.save();
//         res.status(200).json({ message: 'Price updated successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.delete('/deleteMedicine/:name', async (req, res) => {
//     try {
//         const name = req.params.name.trim().toLowerCase();
//         if (name === '') {
//             return res.status(400).json({ message: 'Please enter a valid name' });
//         }
//         const medicine = await Medicine.findOne({ name });
//         if (!medicine) {
//             return res.status(404).json({ message: 'Medicine not found, recheck the name' });
//         }
//         await medicine.remove();
//         res.status(200).json({ message: 'Medicine deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;
