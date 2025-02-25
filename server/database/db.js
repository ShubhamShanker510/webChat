const mongoose=require('mongoose');

const connectDb=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")

    } catch (error) {
        console.log("Database connection failed=>",error);
        process.exit(1)
    }
}

module.exports=connectDb