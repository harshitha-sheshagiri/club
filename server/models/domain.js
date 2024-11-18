// models/member.js
const mongoose = require('mongoose');

// Define the schema
const domainSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    problemStatus: { type: String, required: true },
    teamSize: { type: Number, required: true }
});

// Create the model
const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
