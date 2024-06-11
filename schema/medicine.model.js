const mongoose = require('mongoose');
const medicineSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    salt:{
      type:Array,
      required:true
    },
    manufacturer:{
      type:String,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    quantity:{
      type:Number,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    category:{
      type:String,
      required:true
    },
    expiry:{
      type:Date,
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    updatedAt:{
      type:Date,
      default:Date.now
    },
    isSellable:{
      type:Boolean,
      default:true
    },
    isExpired:{
      type:Boolean,
      default:false
    },
    sellCount:{
      type:Number,
      default:0
    },
    isSold:{
      type:Boolean,
      default:false
    },
    seller:{
      type:String,
      default:''
    },
})

medicineSchema.index({ name: 1 });
medicineSchema.index({ category: 1 });
medicineSchema.index({ type: 1 });
medicineSchema.index({ manufacturer: 1 });
medicineSchema.index({ price: 1 });
medicineSchema.index({ quantity: 1 });
medicineSchema.index({ expiry: 1 });
medicineSchema.index({ salt: 1 });
const Medicine=mongoose.model('Medicine',medicineSchema);
module.exports=Medicine;
// Path: ZM/server.js
// Compare this snippet from ZM/server.js: