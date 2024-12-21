const LinkModel = require("../Models/Link.model");
const UserModel = require("../Models/User");
const { z } = require("zod");
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
        // single link
        const link = req.body;

        if (!link.type || !link.url) {
            return res.status(400).json({
                message: 'Please provide all fields',
                success: false
            });
        }

        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const newLink = new LinkModel({
            type: link.type,
            url: link.url
        });

        await newLink.save();


        // Add the new links to the user's links array
        user.links.push(newLink._id);
        await user.save();

        res.status(200).json({
            message: 'Link added successfully!',
            success: true,
            links: newLink
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};



// Validation schema for URL
const linkValidationSchema = z.object({
    type: z.string(),
    url: z.string().url("Invalid URL"),
});

// Update a link
const updateLink = async (req, res) => {
    try {
        const { id } = req.params; // Link ID
        const { type, url } = req.body;

        // Validate request body
        linkValidationSchema.parse({ type, url });

        // Assume `links` is your database model
        const updatedLink = await LinkModel.findByIdAndUpdate(
            id,
            { type, url },
            { new: true }
        );

        if (!updatedLink) {
            return res.status(404).json({ error: "Link not found" });
        }

        res.status(200).json({ message: "Link updated successfully", updatedLink });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a link
const deleteLink = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLink = await LinkModel.findByIdAndDelete(id);
        if (!deletedLink) {
            return res.status(404).json({ error: "Link not found" });
        }

        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.links = user.links.filter(linkId => linkId.toString() !== id);
        await user.save();

        res.status(200).json({ message: "Link deleted successfully", deletedLink });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getUserDetails,
    addLinks,
    updateLink,
    deleteLink
};
