
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");


require("dotenv").config();


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// send OTP for verification

exports.sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const email = req.body.email;

        // validate email
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }



        // check user is already exist or not from this email?
        const userExist = await User.findOne({ email });

        // if user is already exist then return a response.
        if (userExist) {
            return res.status(401).json({
                success: false,
                message: "Account already Exist from this email."
            })
        }

        // function for generate OTP
        var generateOTP = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        // generate OTP
        var otp = generateOTP;
        console.log("Generated otp : ", otp);

        // check unique OTP or not
        let isOtpExist = await OTP.findOne({ otp: otp });

        while (isOtpExist) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            isOtpExist = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };
        // create an entry in DB for OTP

        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody: ", otpBody);

        //return successfull response for sending otp and entring otp in database
        res.status(200).json({
            success: true,
            message: "OTP entered in DB successfully.",
            otp,
        })

    } catch (error) {
        console.log("Isuues while generating and entering OTP in database", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

// signup

exports.signup = async (req, res) => {

    try {

        // fetching data from request body
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are mandatory, please fill carefully"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                status: false,
                message: "Password must be atleast length of 8 characters",
            })
        }

        // validation for password is equal with confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: false,
                message: "Password and confirm Password doesnot matching. please enter the same for both",
            })
        }

        // validate email
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        // check is user already exist or not?
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(401).json({
                success: false,
                message: "Account already Exist from this email."
            })
        }

        // find most recent OTP
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recent OTP: ", recentOTP);

        // validate OTP
        if (recentOTP.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found!",
            })
        } else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!",
            })
        }

        // Hashing the Password for Security
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB for all User details

        //create profile and enter null detail in db, so that we can give reference to the user schema object
        const profileDetail = await Profile.create({
            gender: null,
            dateofBirth: null,
            about: null,
            contactNumber: null,
        });

        const userPayload = {
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            additionalDetails: profileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}  ${lastName}`,
        }

        await User.create(userPayload);

        // Delete the OTP after successful validation
        await OTP.deleteOne({ _id: recentOTP[0]._id });

        // Return successful response
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            User,
        });


    } catch (error) {
        console.log("Issue while doing SignUp, try Again later!", error);
        return res.status(500).json({
            success: false,
            message: "Issue while doing SignUp, try Again later!",
        })
    }



}


// login

exports.login = async (req, res) => {
    try {

        // fetch data from request body
        const { email, password } = req.body;

        // data is fully filled or not by user?
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory, please try again",
            })
        }

        // validation of email

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        // check user is registered or not
        const userExist = await User.findOne({ email }).populate("additionalDetails");

        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "Email is not Registered, please Signup first."
            })
        }

        //generate JWT jsonwebtoken after password matching
        if (await bcrypt.compare(password, userExist.hashedPassword)) {
            const payload = {
                email: userExist.email,
                id: userExist._id,
                role: userExist.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })


            userExist.toObject();
            userExist.token = token;
            userExist.password = undefined;

            // create cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            // send response with cookie.
            res.cookie("login_token", token, options).status(200).json({
                success: true,
                token,
                userExist,
                message: "user login successfully.",
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "login failed! may be Password is wrong",
            })
        }

    } catch (error) {
        console.log("Issue while User login, please try again later.", error);
        res.status(500).json({
            success: false,
            message: "Login Failure, please try again later."
        })
    }
}

// change password

exports.changePassword = async (req, res) => {
    try {

        // fetch data from requesr body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        //data validation
        // data is fully filled or not by user?
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are mandatory, please try again",
            })
        }

        // check newPassword length

        if (newPassword.length < 8) {
            return res.status(400).json({
                status: false,
                message: "Password must be atleast length of 8 characters",
            })
        }
        // check newPassword and confirmNewPassword match

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                status: false,
                message: "Password and confirm Password doesnot matching. please enter the same for both",
            })
        }

        // find user by ID (assuming user ID is stored in req.user.id)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "old Password is incorrect, please try again with correct old password",
            })
        }

        //hashed new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        //update password on Database
        user.password = hashedNewPassword;
        await user.save();

        
        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully.",
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while changing password, please try again later",
        });
    }
}

