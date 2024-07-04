const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de bodyParser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// Configurar la conexión a PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Usar la cadena de conexión de la base de datos de PostgreSQL
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Manejar el envío del formulario
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
