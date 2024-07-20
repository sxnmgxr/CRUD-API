const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter produce name"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        },

    },
    {
        TimeRanges: true
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;