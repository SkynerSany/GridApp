const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Получить все заказы
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Создать новый заказ
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получить заказ по ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) return res.status(404).send('Order not found');
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Обновить заказ
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ orderId: req.params.id }, req.body, { new: true });
        if (!order) return res.status(404).send('Order not found');
        res.json(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удалить заказ
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!order) return res.status(404).send('Order not found');
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;