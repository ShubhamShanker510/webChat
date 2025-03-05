const express = require('express');
const { registerUser, loginUser, getNewAccessToken, getUser, logOut } = require('../controllers/user.controller');
const authentication = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', getNewAccessToken);
router.get('/get', authentication, getUser);
router.delete('/logout',logOut)

module.exports = router;
