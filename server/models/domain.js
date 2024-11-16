// models/member.js
const mongoose = require('mongoose');

// Define the schema
const domainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: Number, required: true },
    contact: { type: String, required: true, unique: true }
});

// Create the model
const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
