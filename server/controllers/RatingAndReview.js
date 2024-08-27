
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create rating

exports.createRating = async (req, res) => {
    try {
        //get userId
        const userId = req.user.id;

        //fetch data {courseId, ratingValue, reviewContent}
        const { courseId, ratingValue, reviewContent } = req.body;

        // validate data (user is enrolled or not in that course)
        const isStudentEnrolled = await Course.findOne({
            _id: courseId,
            studentEnrolled: { $elemMatch: { $eq: userId } },
        });

        if (!isStudentEnrolled) {
            return res.status(404).json({
                status: false,
                message: "Student is not enrolled in the course",
            });
        }

        // validate that no user repeat review (means check is user already reviewed course?)

        // const isUserReviewed = await RatingAndReview.findOne({
        //     _id: courseId,
        //     ratingAndReviews: { $elemMatch: { $eq: userId } },
        // });

        const isUserReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,

        });

        if (isUserReviewed) {
            return res.status(400).json({
                status: false,
                message: "Student is Already Reviewed in that course and repetation is not allowed",
            });
        }

        // create rating review

        const ratingReview = await RatingAndReview.create({
            rating: ratingValue,
            review: reviewContent,
            course: courseId,
            user: userId,
        });


        // add this created review in the corresponding course

        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        );

        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            status: true,
            message: "Rating and Review Submitted Successfully.",
            ratingReview,
        });



    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong while creating rating and Review.",
            error: error.message,
        });
    }
}



// ** get Average rating


exports.getAverageRating = async (req, res) => {
    try {
        // get Course Id
        const courseId = req.body.courseId;

        // calculate Average Rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },

            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // if no rating is available/exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rating given till now",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// get all rating and Reviews

exports.getAllRating = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All Reviews Fetched Successfully.",
            data: allReviews,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// TODO: get all rating reviews with respect to course





