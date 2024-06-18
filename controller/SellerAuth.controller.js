const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/seller.model.js');
const generateTokenAndSetCookie = require('../utils/generateToken.js');

function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;
  return re.test(password);
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const getSellers=async(req,res)=>{
  try{
    const sellers = await User.find();
    if(sellers.length===0) return res.status(404).json({message:'No Sellers found'});
    res.status(200).json(sellers);
  }catch(err){
    res.status(500).json({message:'Internal server error',error:err.message});
  }
}
const signup = async (req, res) => {
  try {
    let { fullname, username, email, password, confirmPassword } = req.body;
    fullname = fullname.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (!fullname || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and must be at least 8 characters long" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    const user = await User.findOne({ username: username, email: email });
    if (user) {
      return res.status(400).json({ error: "Username or email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({ msg: "User created successfully", user_id: newUser._id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ msg: "Logged in successfully", user_id: user._id });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const logout = (req, res) => {
  try {
    res.cookie('jwt', "", { maxAge: 0 });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { signup, login, logout, getSellers };
