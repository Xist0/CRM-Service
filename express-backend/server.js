const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); // Добавляем middleware для обработки JSON

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

app.use(express.json()); // Добавляем middleware для обработки JSON




let users = [
  {
    id_staff: '1',
    staff_name: 'Сабитов Рустам Ирэкович',
    staff_role: 'Инженер',
    staff_phone: '1',
    staff_password: '1',
  }
];

app.post('/authorize', (req, res) => {
  const { authorizationLogin, authorizationPassword } = req.body;

  const user = users.find(
    (u) => (u.staff_name === authorizationLogin || u.staff_phone === authorizationLogin) && u.staff_password === authorizationPassword);
  if (user) {
    res.status(200).json({
      id_staff: user.id_staff,
      staff_role: user.staff_role,
      staff_password: user.staff_password,
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});
// API доступа к 1C

app.get('/api/:resource', async (req, res) => {
  const { resource } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/${resource}`);

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

app.get('/api/order/:limit/:offset', async (req, res) => {
  const { limit, offset } = req.params;
  console.log(limit);
  console.log(offset);

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/order/${limit}/${offset}`);

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


app.get('/api/typeofrepaire', async (req, res) => {

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/typeofrepaire`);

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

app.get('/api/1c/users/search', async (req, res) => {
  const { query } = req.query;
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(`http://192.168.1.10/api/1c/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    // Фильтрация пользователей по ФИО и номеру телефона
    const filteredUsers = users.filter(user => {
      return user.name_user.toLowerCase().includes(query.toLowerCase()) ||
        user.phone_user.includes(query);
    });
    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/byt/order/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/byt/order/${number}`);

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
app.get('/api/1c/users', async (req, res) => {

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/1c/users`);

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
app.get('/api/order/record/:date/:name', async (req, res) => {
  const { date, name } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/order/record/${date}/${name}`);

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
