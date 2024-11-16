const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Domain = require('../server/models/domain');  // Import the Member model
const { ObjectId } = require('mongodb');

const app = express();
const port = 5001;

// MongoDB connection string (update with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/club', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

app.get('/domain/:domainId', async (req, res) => {
    try {
        const objectId = new ObjectId(req.params.domainId);

        // Fetch the domain based on the objectId
        const domain = await Domain.findOne({ _id: objectId });

        if (domain) {
            res.json(domain);
        } else {
            res.status(404).send('Domain not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
