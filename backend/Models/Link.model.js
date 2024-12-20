const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    linkedin: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    portfolio: {
        type: String,
        required: true,
    }
})

const LinkModel = mongoose.model('links', LinkSchema);
module.exports = LinkModel;