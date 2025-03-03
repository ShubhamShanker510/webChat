const User=require('../models/user.model');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function generateAccessToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
        process.env.ACCESS_TOKEN, 
        { expiresIn: '15m' }
    );
}

async function generateRefreshToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d' }
    );
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
            avatar: avatar!==''?avatar:'../public/images/default-user.jpg'
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

        const user=await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "No user exist"
            })
        }

        const isValidPassword=await bcryptjs.compare(password,user.password);

        if(!isValidPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            }
            )
        }



        const accessToken=await generateAccessToken(user);
        const refreshToken=await generateRefreshToken(user);

        if(!accessToken || !refreshToken){
            return res.status(400).json({
                success: false,
                message: "Unable to generate token"
            })
        }

        res.cookie('accessToken',accessToken,{
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 15*60*1000
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7*24*60*60*1000
        })

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
const getNewAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies; 

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found"
            });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Refresh Token expired, Please login again"
                });
            }

            const newAccessToken = await generateAccessToken(user);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 15 * 60 * 1000  
            });

            return res.status(200).json({
                success: true,
                message: "Access Token refreshed successfully"
            });
        });

    } catch (error) {
        console.log("Error in getting new access token =>", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getUser=async(req,res)=>{
   try {
    const user=req.userInfo;

    if(!user){
        return res.status(400).json({
            success: false,
            message: "No user found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
    
   } catch (error) {
    console.log("Get user error=>",error);
    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
   }

}


module.exports = { registerUser, loginUser, getNewAccessToken, getUser };