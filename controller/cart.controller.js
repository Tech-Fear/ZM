const Cart = require('../schema/cartDetails.model.js');
const Medicine = require('../schema/medicineDetails.model.js');
const Seller = require('../schema/medicineSellerInfo.model.js');

const validateQuantity = async (quantity, sellerId, medicineId) => {
  const medi = await Seller.findOne({ sellerID: sellerId, medicineID: medicineId });
  if (medi && quantity <= medi.quantity) return true;
  return false;
}

const addToCart = async (req, res) => {
  try {
    const { sellerId, medicineId, quantity, userId } = req.body;
    const medi = await Seller.findOne({ sellerID: sellerId, medicineID: medicineId });
    if (!medi) {
      return res.status(400).send({ error: 'Medicine not found for the given seller.' });
    }
    let cart = await Cart.findOne({ userID: userId });
    if (!cart) {
      cart = new Cart({ userID: userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex(item => item.medicineID.equals(medicineId));
    if (existingItemIndex > -1) {
      const totalQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (totalQuantity > medi.quantity) {
        return res.status(400).send({ error: 'Total quantity exceeds the stock quantity. Fill valid quantity.' });
      }
      cart.items[existingItemIndex].quantity = totalQuantity;
    } else {
      if (quantity > medi.quantity) {
        return res.status(400).send({ error: 'Quantity exceeds the stock quantity. Fill valid quantity.' });
      }
      cart.items.push({ sellerID: sellerId, medicineID: medicineId, quantity });
    }
    await cart.save();
    res.status(200).send(cart);

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

const deleteFromCart = async (req, res) => {
  try {
    const { userId, medicineId } = req.body;
    let cart = await Cart.findOne({ userID: userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found.' });
    }
    const itemIndex = cart.items.findIndex(item => item.medicineID.equals(medicineId));
    if (itemIndex === -1) {
      return res.status(404).send({ error: 'Item not found in cart.' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).send(cart);

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userID: userId }).populate('items.medicineID').populate('items.sellerID');
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found.' });
    }

    res.status(200).send(cart);

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}
const updateQuantity = async (req, res) => {
  try {
    const { userId, sellerId, medicineId, newQuantity } = req.body;
    const medi = await Seller.findOne({ sellerID: sellerId, medicineID: medicineId });
    if (!medi) {
      return res.status(400).send({ error: 'Medicine not found for the given seller.' });
    }
    if (newQuantity > medi.quantity) {
      return res.status(400).send({ error: 'Quantity exceeds the stock quantity. Fill valid quantity.' });
    }
    let cart = await Cart.findOne({ userID: userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found.' });
    }
    const itemIndex = cart.items.findIndex(item => item.medicineID.equals(medicineId));
    if (itemIndex === -1) {
      return res.status(404).send({ error: 'Item not found in cart.' });
    }

    cart.items[itemIndex].quantity = newQuantity;
    await cart.save();
    res.status(200).send(cart);

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = addToCart;
