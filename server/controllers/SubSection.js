
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const cloudinary = require("cloudinary");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body
        const { title, description, SectionId, timeDuration } = req.body;

        // extract file for video
        const video = req.files.videoFile;

        // data validation
        if (!SectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);


        //create a subsection

        const newSubsection = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })

        //update Section with this subsection Id

        const updatedSection = await Section.findByIdAndUpdate({ _id: SectionId }, { $push: { subSection: newSubsection._id } }, { new: true });
        //TODO: log updated section here after adding populate query
        //return response

        return res.status(200).json({
            success: true,
            message: "SubSection added to the Section Successfully",
            updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding SubSection to the Section!",
            error: error.message,
        })
    }
}

// TODO:

//update Subsection 

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionTitle, subSectionId } = req.body;

        // validate data
        if (!subSectionTitle || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            })
        }
        // find and update
        const updateSS = await SubSection.findByIdAndUpdate({ subSectionId }, { title: subSectionTitle }, { new: true });
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection update Successfully.",
            updateSS,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating SubSection.",
        })
    }
}

//Delete Subsection

exports.deleteSubSection = async (req, res) => {
    try {
        // fetch data {subSectionId, sectionId}
        const { subSectionId, sectionId } = req.body;

        // remove subSection from corresponding subsection
        await Section.findByIdAndUpdate(sectionId, { $pull: {subSection :subSectionId } }, { new: true });

        // find this SubSection and delete
        const delSubSection = await SubSection.findByIdAndDelete(subSectionId);



        //return res
        return res.status(200).json({
            success: true,
            message: "SubSection deleted Successfully.",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting SubSection.",
        })
    }
}