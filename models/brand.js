const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    }
})