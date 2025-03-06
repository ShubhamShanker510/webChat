const express=require('express');
const authentication = require('../middleware/auth.middleware');
const {createMeeting, joinMeeting, getMeetingDetails, endMeeting}=require('../controllers/meeting.controller')

const router=express.Router();

router.post('/create',authentication,createMeeting);
router.post('/join/:meetingId',authentication,joinMeeting);
router.get('/:meetingId',authentication,getMeetingDetails);
router.put('/end/:meetingId',authentication,endMeeting)

module.exports=router;