const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const userController = require('../controllers/UserController');

// Crear reservación
router.post('/create', reservationController.createReservation);

// Obtener todas las reservaciones
router.get('/all', reservationController.getReservation);

// Obtener reservaciones por fecha (usando query params)
router.post('/by-date', reservationController.getReservationByDate);

// Actualizar reservación por ID
router.put('/update/:id', reservationController.updateReservation);

// Eliminar reservación por ID
router.delete('/delete/:id', reservationController.deleteReservation);

// Obtener horarios disponibles
router.get('/available', reservationController.getAvailableSchedules);

router.post('/create', userController.createUser);

module.exports = router;
