const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose =require('mongoose');
const colors=require('colors')

const medicineRoute=require('./routes/medicine.route');
const authRoutes=require('./routes/auth.routes');
const connectDB=require('./config/db.connect.js')

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/medicine',medicineRoute);
app.use('/api/auth',authRoutes);


PORT= process.env.PORT || 5000;
app.listen(PORT,async ()=>{
  try{
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT}`.bgGreen.white);
  }catch(err){
    console.error('Server failed to start:',err.message.bgRed);
  }
})