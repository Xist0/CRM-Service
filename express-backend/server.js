const express = require('express');
const https = require('https');
const fs = require('fs');


const app = express();
const port = 3000;

// Разрешение CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Сертификат безопасности
const options = {
    key: fs.readFileSync('./CRMServe-private.key'),
    cert: fs.readFileSync('./CRMServe.crt')
};

// Запрос к внешнейБэку
app.get('', async (req, res) => {
    try {
        // Делаем GET-запрос к другому бэкенду на HTTP
        const response = await axios.get('http://192.168.1.68');

        // Возвращаем данные из ответа в вашем HTTPS бэкенде
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
