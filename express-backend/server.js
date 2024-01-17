const express = require('express');
const https = require('https');
const fs = require('fs');


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

app.get('/api/users', (req, res) => {
    // Здесь вы можете обработать запрос и отправить данные
    const users = [
        { id: 1, name: 'Пользователь 1' },
        { id: 2, name: 'Пользователь 2' },
        // Добавьте своих пользователей по мере необходимости
    ];

    res.json(users);
});
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
