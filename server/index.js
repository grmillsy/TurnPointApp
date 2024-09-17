const express = require('express')
const {client} = require("@prisma/client");
const app = express()
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/clients', async (req, res) => {
    const clients = await prisma.client.findMany();
    res.json(clients);
})

app.post('/client', async(req, res) => {
    const { name, dateOfBirth, mainLanguage, secondaryLanguage, fundingSource } = req.body;
    if (!name || !dateOfBirth || !mainLanguage || !fundingSource) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newClient = await prisma.client.create({
            data: {
                name,
                dateOfBirth,
                mainLanguage,
                secondaryLanguage,
                fundingSource
            }
        });
        res.json(newClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})