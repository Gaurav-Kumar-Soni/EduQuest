
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


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
    console.log("print id: " , id);

    // validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      })
    }


    //TODO Homework unenroll user from all enrolled Courses
    // await Course.updateMany({ studentsEnrolled }, { $pull: { studentsEnrolled: id } }, { new: true });

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



exports.updateDisplayPicture = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    // Check if displayPicture is provided
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture provided.",
      });
    }

    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    // Log the received file and user ID
    console.log("Received file:", displayPicture);
    console.log("User ID:", userId);

    // Verify tempFilePath
    if (!displayPicture.tempFilePath) {
      return res.status(400).json({
        success: false,
        message: "Temporary file path not found.",
      });
    }

    // Upload image to Cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // Log the uploaded image details
    console.log("Uploaded image:", image);

    // Update user profile with new image URL
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    // Log the updated profile
    console.log("Updated profile:", updatedProfile);

    res.send({
      success: true,
      message: "Image Updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    // Log the error
    console.error("Error updating display picture:", error);

    return res.status(500).json({
      success: false,
      message: `Something went wrong while uploading profile picture: ${error.message}`,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};