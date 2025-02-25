const User=require('User');
const bcryptjs=require('bcryptjs')

const registerUser=async(req,res)=>{
    try {
        const {name,email,password,avatar}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        //hash password
        const salt=bcryptjs.genSalt(10);
        const hashPassword=bcryptjs.hash(password,salt);

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
            avatar,
            createdAt
        })



    } catch (error) {
        console.log("Error in registering user=>",error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }



}