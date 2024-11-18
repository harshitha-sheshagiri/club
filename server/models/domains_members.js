const mongoose = require('mongoose');

// Define the schema
const domainsMembersSchema = new mongoose.Schema({
    member_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Member', // Referencing model 'Member' collection
        required: true
    },
    domain_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Domain', // Referencing model 'Domain' collection
        required: true
    }

}, { versionKey: false });

// Create the model
const DomainsMembers = mongoose.model('DomainsMembers', domainsMembersSchema);

module.exports = DomainsMembers;
