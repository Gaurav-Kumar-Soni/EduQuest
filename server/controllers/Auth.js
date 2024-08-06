
const mongoose = require("mongoose");
const OTP = require("../models/OTP");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");

require("dotenv").config();


// send OTP for verification

exports.sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const email = req.body.email;

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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

exports.signUP = async (req, res) => {

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

        // validation for password is equal with confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: false,
                message: "Password and confirm Password doesnot matching. please enter the same for both",
            })
        }

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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
        } else if (otp !== recentOTP.otp) {
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
            message:"Issue while doing SignUp, try Again later!",
        })
    }



}



// login

// change password

