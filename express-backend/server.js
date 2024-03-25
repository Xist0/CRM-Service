import express from "express";
import https from "https";
import fs from 'fs';
import cors from 'cors';
const app = express();
const port = 3000;
import bodyParser from 'body-parser';
import axios from 'axios';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { sql } from "./db.js";
import { roleMiddleware } from './autch-express/utils/roleMiddleware.js';
import { register, getRoles } from './autch-express/controllers/register.js';
import { auth } from './autch-express/controllers/auth.js';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// Сертификат безопасности
const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt')
};



app.get('/', roleMiddleware(['ADMIN']), async (req, res) => {
  const data = await sql`select * from Users`
  res.send(data)
})

app.post('/reg', register)
app.post('/auth', auth)
app.get('/roles', getRoles);

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

app.post('/api/1c/WarrantyOrder', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(`http://192.168.1.10/api/1c/WarrantyOrder`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No file uploaded or file format is invalid');
    }
    const fileBytes = req.file.buffer;
    const response = await axios.post('http://192.168.1.10/api/parser/warrantyorder', fileBytes);

    res.send(response.data);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Internal Server Error');
  }
});

const start = async () => {
  // Создаем таблицы, если они не существуют
  // await sql`create table if not exists Roles(
  //       role varchar(100) unique primary key
  //   )`
  // await sql`create table if not exists Users(
  //       id SERIAL PRIMARY KEY NOT NULL,
  //       name varchar(100) NOT NULL,
  //       role varchar(100),
  //       password varchar(100),
  //       FOREIGN KEY (role) REFERENCES Roles(role)
  //   )`

  // const existingMaster = await sql`select * from Roles where role = 'Мастер'`;

  // if (!existingMaster.length) {
  //   await sql`insert into Roles(role) values('Мастер')`;
  // }

  // const existingAdmin = await sql`select * from Roles where role = 'Администратор'`;

  // if (!existingAdmin.length) {
  //   await sql`insert into Roles(role) values('Администратор')`;
  // }
  // const existingАttendant = await sql`select * from Roles where role = 'Заправщик'`;

  // if (!existingАttendant.length) {
  //   await sql`insert into Roles(role) values('Заправщик')`;
  // }
  // const existingIntern = await sql`select * from Roles where role = 'Стажёр'`;

  // if (!existingIntern.length) {
  //   await sql`insert into Roles(role) values('Стажёр')`;
  // }
  // const existingDirector= await sql`select * from Roles where role = 'Директор'`;

  // if (!existingDirector.length) {
  //   await sql`insert into Roles(role) values('Директор')`;
  // }
  // const existingAccountant= await sql`select * from Roles where role = 'Бухгалтер'`;

  // if (!existingAccountant.length) {
  //   await sql`insert into Roles(role) values('Бухгалтер')`;
  // }

  // Создаем сервер и запускаем его
  const server = https.createServer(options, app);

  server.listen(port, () => {
    console.log(`СЕРВАК ФУРЫЧИТ ТУТ https://localhost:${port}`);
  });
};

start();
