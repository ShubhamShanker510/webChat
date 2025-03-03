const mongoose=require('mongoose');
const {v4: uuidv4}=require('uuid')

const meetingSchema=new mongoose.Schema({
    meetingId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
    startedAt:{
        type: Date,
        default: Date.now(),
    },
    endedAt: {
        type: Date
    }
},{timestamps: true})

module.exports=mongoose.model('Meeting',meetingSchema)