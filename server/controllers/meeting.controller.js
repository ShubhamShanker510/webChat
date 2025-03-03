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




module.exports={createMeeting}