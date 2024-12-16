const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    detailsBrand: { type: String },
    detailsSpecifications: { type: [String] } // Массив для хранения характеристик
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;