const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    _id: {  // You can define _id if you want to, but it's not necessary
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    clubName: {  // Add clubName field
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    candidates: [{
        type: String,
        required: true
    }],
    whatsappLink: {
        type: String,
        default: ''
    }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
