
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// reset Password Token

exports.resetPasswordToken = async (req, res) => {
    try {

        // get email from req body

        const email = req.body.email;

        // validate email
        const userExist = await User.findOne({ email }).populate("additionalDetails");

        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "Email is not Registered, please Signup first."
            })
        }

        // generate  token for password reset

        const token = crypto.randomUUID();
        //  update user db by assing token and expires time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        // generate url using token
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing that url to the user
        await mailSender(email, "password Reset Link", ` reset Password here: ${url} `);

        //return response
        return res.json({
            success: true,
            message: "Email send Successfully, please check email and reset your password"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "something went wrong while reseting password."
        })
    }

}


// reset Password in db Update

exports.resetPassword = async (req, res) => {
    try {
        // fetch data
        const { password, confirmPassword, token } = req.body;
        // validation
        if (password !== confirmPassword) {
            return res.json({
                status: false,
                message: "password and confirm password is not matching",
            })
        }
        // get userDetail from db using token

        const userDetails = await User.findOne({ token: token });
        // if no entry -> invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "token is invalid!",
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token time Expires, please regenerate your token."
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }

        );
        //return respanse
        return res.status(200).json({
            success: true,
            message: "password reset successfully.",
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password."
        })
    }
}