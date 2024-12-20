const LinkModel = require("../Models/Link.model");
const UserModel = require("../Models/User");

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).populate('links');

        console.log(user)
        if (!user) {
            return res.status(404)
                .json({
                    message: "User not found",
                    success: false
                })
        }
        res.status(200)
            .json({
                message: "User found",
                success: true,
                user
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const addLinks = async (req, res) => {
    try {
        const { linkedin, github, portfolio } = req.body;

        // Validation for required fields
        if (!linkedin || !github || !portfolio) {
            return res.status(400).json({
                message: 'All link fields (linkedin, github, portfolio) are required.',
                success: false
            });
        }

        // Check if the user exists (from the decoded JWT token)
        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Create a new Link entry
        const newLinks = new LinkModel({
            linkedin,
            github,
            portfolio
        });

        // Save the link and associate it with the user
        await newLinks.save();

        // Update the user's links reference in the User model
        user.links = newLinks._id;
        await user.save();

        res.status(200).json({
            message: 'Links added successfully!',
            success: true,
            links: newLinks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    getUserDetails,
    addLinks,
}