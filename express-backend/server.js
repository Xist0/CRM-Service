const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
const accessTokenSecret = '4362734262347';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

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

let activeSessions = {}; // Объект для хранения активных сессий пользователей

// Middleware для проверки токена доступа
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware для установки времени сессии и обновления токена
const setSessionTime = (req, res, next) => {
  next();
};

// Middleware для проверки активности сессии пользователя
const checkSessionActivity = (req, res, next) => {
  const userId = req.user && req.user.username;
  if (!userId || !activeSessions[userId]) {
    return res.sendStatus(401); // Пользователь не авторизован или сессия не активна
  }
  next();
};

// Маршрут для входа пользователя
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Поиск пользователя в массиве по имени пользователя (телефону) и паролю
  const user = users.find(u => u.staff_phone === username && u.staff_password === password);

  if (user) {
    // Вход успешен, возвращаем имя пользователя вместе с токеном
    const accessToken = jwt.sign({ username: user.staff_name, role: user.staff_role }, accessTokenSecret);
    activeSessions[user.staff_name] = true;
    res.status(200).json({ accessToken, username: user.staff_name, role: user.staff_role });

  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

// Маршрут для выхода пользователя из аккаунта
app.post('/api/logout', authenticateToken, (req, res) => {
  const { username } = req.user;
  delete activeSessions[username]; // Удаление активной сессии пользователя
  res.status(200).json({ message: 'Logout successful' });
});


app.get('/api/user', authenticateToken, (req, res) => {
  const { username } = req.user;
  const user = users.find(u => u.staff_name === username);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
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


app.get('/api/users/search/:l_name', async (req, res) => {
  const { l_name } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/users/search/${encodeURIComponent(l_name)}`);

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
app.get('/api/works1c/:Z_name', async (req, res) => {
  const { Z_name } = req.params;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`http://192.168.1.10/api/works1c/${encodeURIComponent(Z_name)}`);

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




app.post('/api/parser/warrantyorder', upload.single('file'), async (req, res) => {
  try {
    // Проверяем, был ли файл загружен успешно
    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No file uploaded or file format is invalid');
    }

    // Получаем байты файла
    const fileBytes = req.file.buffer;

    // Отправляем файл на внешний бэк
    const response = await axios.post('http://192.168.1.10/api/parser/warrantyorder', fileBytes);

    res.send(response.data);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Исправленная строка создания HTTPS-сервера
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
