const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.header('authorization')?.split(' ')[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found, please login"
      });
    }


    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    
    req.userInfo = decoded;


    next();
  } catch (error) {

    return res.status(403).json({
      success: false,
      message: "Invalid or expired token, please login again"
    });
  }
};

module.exports = authentication;
