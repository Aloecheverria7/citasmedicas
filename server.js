require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors()); 
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});


//DB configuration
const db= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if(err) throw err;
})

module.exports.db = db;

//Routes files
const reservationRoute = require('./routes/Reservation');
const userRoute = require('./routes/User');
//use routes
app.use('/api/reservations', reservationRoute);
app.use('/api/user', userRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port`);
});