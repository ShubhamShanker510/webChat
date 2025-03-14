const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: '../public/images/default-user.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('User',userSchema);