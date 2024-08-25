
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { gender, dateOfBirth = "", about = "", contactNumber } = req.body
        //get UserId
        const id = req.user.id;
        //validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        // find profile (find profile_Id in user database)
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateofBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        profileDetails.about = about;

        await profileDetails.save();  // save data using save() funstion 

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating Profile!",
            error: error.message,
        })
    }
}

// delete account handler

exports.deleteAccount = async (req, res) => {
    try {
        // get id of user Account
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            })
        }


        //TODO Homework unenroll user from all enrolled Courses
        await Course.updateMany({studentsEnrolled}, { $pull: { studentsEnrolled: id } }, { new: true });

        // first delete profile of user
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // delete user
        await User.findByIdAndDelete({ _id: id })

        // return response
        return res.status(200).json({
            success: true,
            message: "User Account Deleted Successfully",
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting Account!",
            error: error.message,
        })
    }
}

// Full Details of a user

exports.getAllUserDetails = async (req, res) => {
    try {
        // fetch userId
        const id = req.user.id;

        //validate and fetch user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetch Successfully",
            userDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Issue in while fetching full User Data",
        });
    }
}