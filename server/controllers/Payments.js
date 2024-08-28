
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {

    // get courseId and userId
    const { courseId } = req.body;
    const userId = req.user.id;

    // data validation
    // valid courseId
    if (!courseId) {
        return res.status(400).json({
            success: false,
            message: "please provide valid course ID!"
        })
    }
    //valid courseDetails
    let course;
    try {
        course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "could not find the course!"
            });
        }
        //check is user already pay for the same course?

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled in this Course"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: courseId,
            userId,
        }
    }

    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse)
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "couldn't initiate Order"
        });
    }

}

// verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = request.headers["x-raxorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("payment is Authorized");

        const { courseId, userId } = req.boy.payload.payment.entity.notes;

        try {
            // fulfill the action
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course Not Found",
                });
            }
            console.log(enrolledCourse);

            // find the student and add the course in their list of enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );

            console.log(enrolledStudent);

            // send confirmation mail to user
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "congratulations from eduQuest",
                "you are onboarded into new eduQuest Course",
            );
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "signature Verified and course Added"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

    } else {
        return res.status(400).json({
            success: false,
            message: "Signature not verified, Invalid request!"
        });
    }

}