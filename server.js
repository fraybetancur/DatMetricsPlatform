require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/submit', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO users(name) VALUES($1)';
  client.query(query, [name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al insertar en la base de datos');
    } else {
      res.send('Formulario enviado exitosamente');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
