require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());

// Configuración de CORS para aceptar cualquier dominio
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
      }
    console.log('Conectado a la base de datos MySQL');
});

module.exports.db = db;

// Importar rutas
const reservationRoute = require('./routes/Reservation');
const userRoute = require('./routes/User');

// Usar rutas
app.use('/api/reservations', reservationRoute);
app.use('/api/user', userRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;