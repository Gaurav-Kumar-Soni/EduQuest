
const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

// createCourse handler function

exports.createCourse = async (req, res) => {
    try {

        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                allTags,
            })
        }

        // check for Instructor (fetch Instructor Id from DB).
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor Details", instructorDetails);

        // TODO: verify that userId or instructorDetails._id are same or not??

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Instructor Details not Found",
            })
        }

        //check given tag is valid or not

        const tagDetails = await Tag.findById(tag);
        if (!tagDetails) {
            return res.status(400).json({
                success: false,
                message: "tag Details not Found",
            });
        }

        //upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,

        })

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );

        // update tag Schema..
        // Homework



        //return Response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully.",
            data: newCourse,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating Course",
            error: error.message
        })
    }
}

// showAllCourses Handler Function

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            courseDescription: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        })
            .populate("Instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "All courses Fetched and shown successfully.",
            data: allCourses,
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while showing/fetching all Course",
            error: error.message
        })
    }
}

