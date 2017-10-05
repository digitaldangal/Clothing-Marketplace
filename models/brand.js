const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    }
})