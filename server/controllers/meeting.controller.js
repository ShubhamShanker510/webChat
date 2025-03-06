const Meeting=require('../models/meeting.model')


const createMeeting = async (req, res) => {
    try {
        const { userId } = req.userInfo;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Please login"
            });
        }

        const meeting = await Meeting.create({
            host: userId
        });

        console.log("Meeting=>", meeting);

        if (!meeting) {
            return res.status(400).json({
                success: false,
                message: "Unable to create meeting"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Meeting created successfully",
            meetingId: meeting.meetingId
        });

    } catch (error) {
        console.log('Create Meeting Error=>', error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
    }
}


const joinMeeting=async(req,res)=>{
    try {
        const {meetingId}=req.params;
        const {userId}=req.userInfo;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "Please login first"
            })
        }

        const meeting=await Meeting.findOne({meetingId});

        if(!meeting || !meeting.isActive){
            return res.status(400).json({
                success: false,
                message: "Meeting not found"
            })
        }

        if(!meeting.participants.includes(userId)){
            meeting.participants.push(userId);
            await meeting.save();
        }

        return res.status(200).json({
            success: true,
            message: "Meeting joined successfully"
        })
        
    } catch (error) {
        console.log("Join meeting error=>",error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getMeetingDetails=async(req,res)=>{
    try {

        const {meetingId}=req.params;

        const meeting=await Meeting.findOne({meetingId});

        if(!meeting){
            return res.status(400).json({
                success: false,
                message: "Meeting details not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Meeting details found successfully",
            meeting
        })
        
    } catch (error) {
        console.log("Get meeting details error=>",error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const endMeeting=async(req,res)=>{
    try {
        const {meetingId}=req.params;

        if(!meetingId){
            return res.status(400).json({
                success: false,
                message: "meeting not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Meeting end successfully"
        })
        
    } catch (error) {
        console.log("End meeting error=>",error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}




module.exports={createMeeting, joinMeeting, getMeetingDetails,endMeeting}