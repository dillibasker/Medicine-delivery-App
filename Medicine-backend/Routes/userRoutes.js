const express=require("express")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/user")

const router=express.Router()

router.post("/register" , async (req,res) =>{
    const {name,email,password,address}=req.body;
    const hashedPassword=await bcrypt.hash(password,10)

    try{
        const user= await User.create({name,email,password:hashedPassword,address})
        res.json({message: "user regiteration is successfull"})
    }
    catch(err){
        res.status(500).json({error:err.message
        });
        }})

router.post("/login",async(req,res) =>{
    const {email,password} =req.body
    const user= await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){
        const token=jwt.sign({userId:user._Id },"secret" ,{expiresIn: "1h"})
        res.json({token,user})
    }else{
        res.status(401).json({message:"Invalid credentails"})
    }
})

module.exports =  router