const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Seller'
  },
  medicineID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Medicine'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [itemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
