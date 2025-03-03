const express = require('express');
const { registerUser, loginUser, getNewAccessToken, getUser } = require('../controllers/user.controller');
const authentication = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', getNewAccessToken);
router.get('/get', authentication, getUser);

module.exports = router;
