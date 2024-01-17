const express = require('express');
const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const options = {
    key: fs.readFileSync('./CRMServe-private.key'),
    cert: fs.readFileSync('./CRMServe.crt')
};

app.use(async (req, res, next) => {
    try {
        // Убрал ожидание запроса с фронта
        const response = await fetch('http://192.168.1.68');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/status', (req, res) => {
    res.send('Server is running');
});

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
