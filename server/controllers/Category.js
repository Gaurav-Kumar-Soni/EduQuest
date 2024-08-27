
const Category = require("../models/Category");
const Course = require("../models/Course");


//create tag handler
exports.createCategory = async (req, res) => {
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
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully."
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating Category."
        })
    }
}

//getAllTags handler function

exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All Category fetched successfully",
            allCategory,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "something went wrong while fetching all Category from db."
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {

        // get categoryId
        const { categoryId } = req.body;

        // get courses for specified categoryId

        const selectedCateoryCourses = await Category.findById(categoryId)
            .populate("course")
            .exec();

        // validation for courses
        if (!selectedCateoryCourses) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found."
            })
        }

        // get courses for different category
        const diffCategoryCourses = await Category.findById({ _id: { $ne: categoryId }, })
            .populate("course")
            .exec();

        // TODO: get top 10 sellling courses
        

        const topSellingCourses = await Course.find()

        // return response
        return res.status(200).json({
            success: true,
            message: "Data Fetched Successfully of category Courses.",
            data: {
                selectedCateoryCourses,
                diffCategoryCourses,
            },
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "something went wrong while fetching  Category corresponding courses from db."
        })
    }
}