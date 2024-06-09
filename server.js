const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const mongoose =require('mongoose');
const medicineRoute=require('./routes/medicine.route');
app.use('/api',medicineRoute);

const connect=async ()=>{
  await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log(err));
}


app.listen(process.env.PORT,async ()=>{
  await connect();
  console.log(`Server is running on port ${process.env.PORT}`);
})