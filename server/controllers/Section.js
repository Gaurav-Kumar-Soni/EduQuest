

const Section = require("../models/Section");
const Course = require("../models/Course");

// createSection handler function

exports.createSection = async (req, res) => {
    try {

        //fetch data from req body
        const { sectionName, courseId } = req.body;
        // validate data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            })
        }
        // create Section
        const newSection = await Section.create({ sectionName });

        // update this section in the corresponding Course
        const upadtedCourseDetails = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: newSection._id } }, { new: true }).populate().exec();
        // TODO:  homework- use populate to replace section and subsection both in the updatedCourseDetails 

        // return response
        return res.status(200).json({
            success: true,
            message: "Section added to the course Successfully",
            upadtedCourseDetails,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding Section to the course!",
        })
    }
}

// update Section handler for changing Section name

exports.updateSection = async (req, res) => {
    try {
        //data input
        const { sectionName, sectionId } = req.body;

        //data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            })
        }
        //update data

        const updatedata = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        //return response
        return res.status(200).json({
            success: true,
            message: "Section Updated  Successfully",
            updatedata,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong updating Section!",
        })
    }
}

// deteteSection handler for deletion of section

exports.deleteSection = async (req, res) => {
    try {
        // fetch sectionId of the section which have to be deleted
        //assume that we are sending id in the params

        const { courseId, sectionId } = req.body;
        console.log("courseId: ", courseId);
        console.log("sectionId: ", sectionId);
        // validate data
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            })
        }

        // delete section
        const delSection = await Section.findByIdAndDelete(sectionId)

        // update Course database, means pull sectionId from Course
        //TODO: below is todo..
        await Course.findByIdAndUpdate(courseId, { $pull: { sectionId } }, { new: true });


        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted  Successfully",
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting Section!",
        })
    }
}