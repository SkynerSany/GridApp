const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Получить всех пользователей
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Добавить нового пользователя
router.post('/', async (req, res) => {
    const prevUser = await User.findOne({ id: req.body.id });
    if (prevUser) res.status(400).json({ message: "Пользователь уже существует" });
    const user = new User(req.body);

    try {
        await user.save();
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Изменить пользователя
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({id: req.params.id}, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;