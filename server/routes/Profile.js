const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth")
const { updateProfile, deleteAccount, getAllUserDetails, getEnrolledCourses, updateDisplayPicture } = require("../controllers/Profile");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************


// Router for Profile Update 
router.put("/updateProfile", auth, updateProfile)


// Router for Profile deleted 
router.delete("/deleteProfile", auth, deleteAccount)

// Router for show all profile details of a User
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

// update User Profile
router.put("/updateDisplayPicture", updateDisplayPicture)


module.exports = router

