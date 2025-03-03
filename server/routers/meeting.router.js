const express=require('express');
const authentication = require('../middleware/auth.middleware');
const {createMeeting}=require('../controllers/meeting.controller')

const router=express.Router();

router.post('/create',authentication,createMeeting);

module.exports=router;