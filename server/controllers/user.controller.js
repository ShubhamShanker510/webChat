const User=require('../models/user.model');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function generateAccessToken(user){
   return await jwt.sign({
        userId: user._id,
        name:user.name,
        email: user.email,
        avatar: user.avatar
    },process.env.ACCESS_TOKEN,{
        expiresIn: '15m'
    })
}

async function generateRefreshToken(user){
    return await jwt.sign({
        userId: user._id,
        name:user.name,
        email: user.email,
        avatar: user.avatar
    },process.env.REFRESH_TOKEN,{
        expiresIn: '7d'
    })
}




const registerUser=async(req,res)=>{
    try {
        const {name,email,password,avatar}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        //checking if existing user
        const exisitngUser=await User.findOne({email});

        if(exisitngUser){
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt);

        if(!hashPassword){
            return res.status(500).json({
                success: false,
                message: "Enter your password again"
            })
        } 

        //creating new user
        const user=await User.create({
            name,
            email,
            password: hashPassword,
            avatar
        })

        if(!user){
            res.status(401).json({
                success: false,
                message: "Something went wrong while creating user"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        })




    } catch (error) {
        console.log("Error in registering user=>",error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }



}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.find({email});
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "No user exist"
            })
        }

        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);

        if(!accessToken || !refreshToken){
            return res.status(400).json({
                success: false,
                message: "Unable to generate token"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User login successfully",
            user,
            accessToken,
            refreshToken
        })
        
    } catch (error) {
        console.log("Login user Error=>",error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}




module.exports={registerUser}