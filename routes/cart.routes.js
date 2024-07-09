const express=require('express');
const router=express.Router();
const {addToCart,deleteFromCart,viewCart,updateQuantity}=require('../controller/cart.controller.js');

router.post('/addToCart',addToCart);
router.delete('/deleteFromCart',deleteFromCart);
router.get('/viewCart',viewCart);
router.put('/updateQuantity',updateQuantity);

module.exports=router;