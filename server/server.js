const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Domain = require('../server/models/domain');
const DomainsMembers = require('./models/domains_members')
const Member = require('./models/member')
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

app.get('/domain/nlp', async (req, res) => {
    try {
        const domain = await Domain.findOne({ title: "nlp" });
        const domainMemberMap = await DomainsMembers.find({ domain_id: domain._id.toString() })
        let members = []
        for (let domainMember of domainMemberMap) {
            const member = await Member.findOne({ _id: domainMember.member_id.toString() });
            if (member) {
                members.push(member);
            }
        }

        if (members.length > 0) {
            res.json(members);
        } else {
            res.status(404).send('No members in this domain!');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/domain/computer', async (req, res) => {
    try {
        const domain = await Domain.findOne({ title: "computer" });
        const domainMemberMap = await DomainsMembers.find({ domain_id: domain._id.toString() })
        let members = []
        for (let domainMember of domainMemberMap) {
            const member = await Member.findOne({ _id: domainMember.member_id.toString() });
            if (member) {
                members.push(member);
            }
        }

        if (members.length > 0) {
            res.json(members);
        } else {
            res.status(404).send('No members in this domain!');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/domain/cyber', async (req, res) => {
    try {
        const domain = await Domain.findOne({ title: "cyber" });
        const domainMemberMap = await DomainsMembers.find({ domain_id: domain._id.toString() })
        let members = []
        for (let domainMember of domainMemberMap) {
            const member = await Member.findOne({ _id: domainMember.member_id.toString() });
            if (member) {
                members.push(member);
            }
        }

        if (members.length > 0) {
            res.json(members);
        } else {
            res.status(404).send('No members in this domain!');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});