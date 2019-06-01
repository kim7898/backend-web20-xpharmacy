const { model, Schema } = require('mongoose');
const productSchema = new Schema({
    image: {type: Buffer, required: true},
    contentType: { type: String, required: true },
    title: String,
    description: String,
    price: Number,
    category: String,
    bestSeller: Boolean,
    createAt: {type: Date, default: new Date()},
});
module.exports = model("product", productSchema);