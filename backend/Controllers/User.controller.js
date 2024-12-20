const LinkModel = require("../Models/Link.model");
const UserModel = require("../Models/User");

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).populate('links');

        console.log(user);
        if (!user) {
            return res.status(404)
                .json({
                    message: "User not found",
                    success: false
                });
        }
        res.status(200)
            .json({
                message: "User found",
                success: true,
                user
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

const addLinks = async (req, res) => {
    try {
        const links = req.body; // Array of link objects

        // Ensure body is an array and each link has the necessary fields
        if (!Array.isArray(links)) {
            return res.status(400).json({
                message: 'Request body must be an array of links.',
                success: false
            });
        }

        if (links.some(link => !link.type || !link.url)) {
            return res.status(400).json({
                message: 'Some fields are missing. Each link must have "type" and "url".',
                success: false
            });
        }

        // Check if the user exists (from the decoded JWT token)
        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Create and save the new links
        const newLinks = await Promise.all(links.map(async (link) => {
            const newLink = new LinkModel({
                type: link.type,
                url: link.url
            });

            await newLink.save();
            return newLink._id; // Return the link's ID to add to the user's links array
        }));

        // Add the new links to the user's links array
        user.links = [...user.links, ...newLinks];
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
};
