const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    profileAge: { type: Number, required: true },
    profileAddressStreet: { type: String, required: true },
    profileAddressCity: { type: String, required: true },
    profileAddressZipcode: { type: String, required: true },
    profilePreferencesTheme: { type: String, required: true },
    profilePreferencesNotifications: { type: Boolean, required: true }
});

module.exports = mongoose.model('User ', userSchema);