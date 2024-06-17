const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

sellerSchema.index({username:1})
sellerSchema.index({email:1})

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
