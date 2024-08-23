

const Tag = require("../models/Tags");

//create tag handler
exports.createTag = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // create entry in db
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        })
        console.log(tagDetails);

        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully."
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating tag."
        })
    }
}

//getAllTags handler function

exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All tag fetched successfully",
            allTags,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "something went wrong while fetching all tags from db."
        })
    }
}