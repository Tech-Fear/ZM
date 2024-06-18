const mongoose = require('mongoose');
const medicineSellerInfoSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicineDetails',
        required: true
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required:true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    isSellable: {
        type: Boolean,
        default: true
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    sellCount: {
        type: Number,
        default: 0
    },
    isSold: {
        type: Boolean,
        default: false
    },
    // seller: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Seller',
    //     required:true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

medicineSellerInfoSchema.index({ quantity: 1 });
medicineSellerInfoSchema.index({ expiry: 1 });
medicineSellerInfoSchema.index({ isSellable: 1 });
medicineSellerInfoSchema.index({ isExpired: 1 });
medicineSellerInfoSchema.index({ isSold: 1 });
medicineSellerInfoSchema.index({ seller: 1 });

const MedicineSellerInfo = mongoose.model('MedicineSellerInfo', medicineSellerInfoSchema);
module.exports = MedicineSellerInfo;
