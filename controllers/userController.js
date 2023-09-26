const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await  User.create({
      username,
      password:hashedPassword,

      role,
    });

    if(!user){
      return res.status(500).json({
        message:"Authentication Failed please login"
      })
      
    }

    res.status(201).json({
        message:'User registered successfully',
        user
    })
   
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
};


exports.login= async(req,res)=>{

  try {
    
    const {username,password} = req.body

    const user = await User.findOne({username})

    if (!user) {
      return res.status(401).json({ error: "User is not found" });
    }

    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
      return res.status(401).json({ error: "Password is Wrong" });
    }

    const token = jwt.sign({userId:user._id,username: user.username },process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })


    res.status(200).cookie("token", token).json({
      message:'Login Successful',
      user,
      token
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login Failed",
    });
  }

}

exports.logout= async(req,res)=>{
  res.cookie("token", null);

  res.status(200).json({
    message: "Log out Successfully",
  });

}
