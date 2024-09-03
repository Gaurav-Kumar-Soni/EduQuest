
// auth isAdmin, isStudent, isInstructor

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // Extract JWT token
        console.log("cookie: ", req.cookies.login_token);

        const token = req.cookies.login_token || req.header("Authorization").replace("Bearer ", "") || req.body.login_token;

        if (!token || token == undefined) {
            return res.status(401).json({
                success: false,
                message: "Authentication fail || token missing"
            });
        }

        // Verify token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid!"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the Token"
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student only.",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role (isStudent) cannot be verified!, try again"
        });
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {

        if (req.user.accountType != "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only.",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role (isInstructor) cannot be verified!, try again"
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        console.log("printing AccountType: ", req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only.",
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role (isAdmin) cannot be verified!, try again"
        });
    }
}
