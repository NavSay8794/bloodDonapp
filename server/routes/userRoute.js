import express from "express";
import bcrypt from 'bcryptjs'
import User from "../models/Usermodel.js";
import { generateToken } from "../utils/utils.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User Does Not Exist'
        })
    }

    const isAuthenticated = bcrypt.compare(password, user.password)
    if(!isAuthenticated){
        return res.status(401).json({
            success: false,
            message: 'User Not Authorized or Incorrect Password'
        })
    }

    const token =await generateToken({_id: user._id, email: user.email})
    res.status(200).json({
        success: true,
        message: 'User Logged In Successfully',
        token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.post("/register", async (req, res, next) => {
  try {
    const { fullName, email, username, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    console.log(salt, password)
    const hashedPassword = await bcrypt.hash(password, salt)

    const isUserExist = await User.findOne({ email: email})
    if(isUserExist) {
        return res.status(400).json({
            success: false,
            message: 'User Already Present'
        })
    }
    const newUser = new User({
        fullName: fullName,
        email: email,
        username: username,
        password: hashedPassword
    })

    console.log(newUser)
    await newUser.save()
    res.status(201).json({
        success: true,
        message: 'New User Registered Successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



export default router