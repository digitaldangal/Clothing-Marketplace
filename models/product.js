const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_at:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    fee:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    sub_category:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
})