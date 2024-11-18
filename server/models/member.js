// models/member.js
const mongoose = require('mongoose');

// Define the schema
const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Create the model
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
