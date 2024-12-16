const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Получить все продукты
router.get('/', async (req, res) => {
    try {
        const users = await Product.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создать новый продукт
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получить продукт по ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Обновить продукт
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ productId: req.params.id }, req.body, { new: true });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удалить продукт
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productId: req.params.id });
        if (!product) return res.status(404).send('Product not found');
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;