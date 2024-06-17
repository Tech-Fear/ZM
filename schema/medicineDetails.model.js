const mongoose = require('mongoose');

const medicineDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salt: {
        type: Array,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'tablet', 'capsule', 'syrup', 'ointment', 'injection', 
            'cream', 'gel', 'patch', 'solution', 'suspension', 
            'drops', 'inhaler', 'suppository', 'lotion', 'spray',
            'powder', 'liquid', 'aerosol', 'chewable', 'lozenge',
            'granules', 'sachet', 'strip', 'pessary', 'eye drops',
            'ear drops', 'nasal spray', 'oral suspension', 'topical solution'
        ], 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'antibiotic', 'analgesic', 'antipyretic', 'antiseptic', 
            'sedative', 'antidepressant', 'antiviral', 'antifungal', 
            'anti-inflammatory', 'antihistamine', 'cardiovascular', 
            'gastrointestinal', 'respiratory', 'dermatological', 'endocrine',
            'neurological', 'musculoskeletal', 'renal', 'hepatic',
            'oncological', 'psychiatric', 'immunological', 'hematological',
            'ophthalmological', 'gynecological', 'urological', 'otological',
            'rheumatological', 'geriatric', 'pediatric', 'allergy'
        ], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

medicineDetailsSchema.index({ name: 1 });
medicineDetailsSchema.index({ category: 1 });
medicineDetailsSchema.index({ type: 1 });
medicineDetailsSchema.index({ manufacturer: 1 });
medicineDetailsSchema.index({ price: 1 });
medicineDetailsSchema.index({ salt: 1 });

const MedicineDetails = mongoose.model('MedicineDetails', medicineDetailsSchema);
module.exports = MedicineDetails;



// const mongoose = require('mongoose');
// const medicineSchema=new mongoose.Schema({
//     name:{
//       type:String,
//       required:true
//     },
//     price:{
//       type:Number,
//       required:true
//     },
//     salt:{
//       type:Array,
//       required:true
//     },
//     manufacturer:{
//       type:String,
//       required:true
//     },
//     type:{
//       type:String,
//       required:true
//     },
//     quantity:{
//       type:Number,
//       required:true
//     },
//     description:{
//       type:String,
//       required:true
//     },
//     category:{
//       type:String,
//       required:true
//     },
//     expiry:{
//       type:Date,
//       required:true
//     },
//     createdAt:{
//       type:Date,
//       default:Date.now
//     },
//     updatedAt:{
//       type:Date,
//       default:Date.now
//     },
//     isSellable:{
//       type:Boolean,
//       default:true
//     },
//     isExpired:{
//       type:Boolean,
//       default:false
//     },
//     sellCount:{
//       type:Number,
//       default:0
//     },
//     isSold:{
//       type:Boolean,
//       default:false
//     },
//     seller:{
//       type:String,
//       default:''
//     },
// })

// medicineSchema.index({ name: 1 });
// medicineSchema.index({ category: 1 });
// medicineSchema.index({ type: 1 });
// medicineSchema.index({ manufacturer: 1 });
// medicineSchema.index({ price: 1 });
// medicineSchema.index({ quantity: 1 });
// medicineSchema.index({ expiry: 1 });
// medicineSchema.index({ salt: 1 });
// const Medicine=mongoose.model('Medicine',medicineSchema);
// module.exports=Medicine;
// // Path: ZM/server.js
// // Compare this snippet from ZM/server.js:


