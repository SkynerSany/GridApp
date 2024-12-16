const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: Number, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;