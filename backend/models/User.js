const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: false },
    role: { type: String, required: false },
    profileAge: { type: Number, required: false },
    profileAddressStreet: { type: String, required: false },
    profileAddressCity: { type: String, required: false },
    profileAddressZipcode: { type: String, required: false },
    profilePreferencesTheme: { type: String, required: false },
    profilePreferencesNotifications: { type: Boolean, required: false }
});

module.exports = mongoose.model('User ', userSchema);