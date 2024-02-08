const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
const accessTokenSecret = '4362734262347';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // Добавляем middleware для обработки JSON
app.use(cors()); // Добавляем middleware для обработки CORS

// Сертификат безопасности
const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt')
};

let users = [
  {
    id_staff: '1',
    staff_name: 'Сабитов Рустам Ирэкович',
    staff_role: 'Ingenieur',
    staff_phone: '1',
    staff_password: '1',
  },
  {
    id_staff: '2',
    staff_name: 'Рустам Ирэкович',
    staff_role: 'Admin',
    staff_phone: '2',
    staff_password: '2',
  }
];

// Middleware для проверки роли пользователя
function checkUserRole(allowedRoles) {
  return (req, res, next) => {
    const userId = req.userId;

    // Находим пользователя по userId
    const user = users.find(u => u.id_staff === userId);

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    // Проверяем, есть ли у пользователя доступ к данному ресурсу
    if (!allowedRoles.includes(user.staff_role)) {
      return res.status(403).send('Forbidden');
    }

    // Если пользователь имеет доступ к ресурсу, продолжаем выполнение следующих middleware или обработчика маршрута
    next();
  };
}

// Пример маршрута с ограничением доступа
app.get('/api/order/:limit/:offset', checkUserRole(['Admin', 'Ingenieur']), async (req, res) => {
  // Обработка запроса к ресурсу
});

// app.post('/authorize', (req, res) => {
//   const { authorizationLogin, authorizationPassword } = req.body;

//   const user = users.find(
//     (u) => (u.staff_name === authorizationLogin || u.staff_phone === authorizationLogin) && u.staff_password === authorizationPassword);

//   if (user) {
//     const token = jwt.sign({ id_staff: user.id_staff, staff_name: user.staff_name, staff_role: user.staff_role }, secretKey);
//     res.status(200).json({ token });
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// });
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

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Поиск пользователя в массиве по имени пользователя (телефону) и паролю
  const user = users.find(u => u.staff_phone === username && u.staff_password === password);

  if (user) {
    // Вход успешен, возвращаем имя пользователя вместе с токеном
    const accessToken = jwt.sign({ username: user.staff_name, role: user.staff_role }, accessTokenSecret);
    res.status(200).json({ accessToken, username: user.staff_name });
  } else {
    // Вход не удался
    res.status(401).json({ message: 'Login failed' });
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
