
const mailSender = require("../utils/mailSender");

// send confirmation mail to user that their msg has been sent to this platform

const sentConfirmationMail = async (req, res) => {
    try {
        // fetch data
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "All field are mandatory"
            })
        }
        const mailResponse = await mailSender(
            email,
            `hello ${name},`,
            "your msg has been recevied",
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "mail send to user Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while sending mail to user in ContactUs "
        })
    }

}
