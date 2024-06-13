const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
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

sellerSchema.index({username})
sellerSchema.index({email})

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
