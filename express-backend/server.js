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

// Общий обработчик для всех /api/:resource
app.get('/api/:resource', async (req, res) => {
  const { resource } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.68/api/${resource}`);

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

// Исправленная строка создания HTTPS-сервера
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});