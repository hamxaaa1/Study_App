const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    image: { type: String, default: "" }, // profile image URL

    description: { type: String, default: "" }, // short bio or about

    address: { type: String, default: "" },

    phone: { type: String, default: "" }, // optional phone

    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },

    isVerified: { type: Boolean, default: false }, // if you want email/phone verification

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
