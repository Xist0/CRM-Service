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
app.use(async (req, res, next) => {
    try {
        // Делаем GET-запрос к другому бэкенду на HTTP
        const response = await fetch('http://192.168.1.68');

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Извлекаем данные из ответа
        const responseData = await response.json();

        // Возвращаем данные из ответа в вашем HTTPS бэкенде
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Исправленная строка создания HTTPS-сервера
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
