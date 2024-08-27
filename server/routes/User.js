// import require modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { login, signup, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");





// / Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Route for User login
router.post("/login", login)

// Route for User signup
router.post("/signup", signup)

// Route for sending OTP to the user email
router.post("/sendotp", sendOTP)

// Route for Change Password
router.post("/changepassword", changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification

router.post("/reset-password", resetPassword)

// Export the router for use in the main application

module.exports = router

