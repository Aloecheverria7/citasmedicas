const Reservation = require('../models/Reservation');
const ReservationData = require('../models/ReservationData');

exports.createReservation = (req, res) => {
    const reservationData = new ReservationData(req.body);

    // Validación de edad
    if (reservationData.age < 15) {
        return res.status(400).send({ error: 'La edad debe ser mayor a 15 años' });
    }

    // Validar si ya existe una reserva para la misma fecha y hora
    Reservation.checkConflict(reservationData.selected_date, reservationData.selected_schedule, (err, conflict) => {
        if (err) {
            console.error('Error al verificar conflictos de reserva:', err);
            return res.status(500).send({ error: 'Error al verificar conflictos de reserva' });
        }

        if (conflict) {
            return res.status(400).send({ error: 'El horario seleccionado ya está ocupado, por favor seleccione otro' });
        }

        // Crear la nueva reservación
        Reservation.createReservation(reservationData.toObject(), (error, results) => {
            if (error) {
                console.error('Error al crear la reservación:', error);
                return res.status(500).send({ error: 'Error al crear la reservación' });
            }
            res.status(201).send({ message: 'Horario asignado', scheduleId: results.insertId });
        });
    });
};



exports.getReservation = (req, res) => {
    Reservation.getReservation((error, results) => {
        if (error) {
            console.error('Error al obtener las reservaciones:', error);
            return res.status(500).send({ error: 'Error al obtener las reservaciones' });
        }
        res.status(200).send(results);
    });
};

exports.getReservationByDate = (req, res) => {
    const { selected_date } = req.body; // Cambiar de params a body

    if (!selected_date) {
        return res.status(400).send({ error: 'La fecha seleccionada es requerida' });
    }

    Reservation.getReservationByDate(selected_date, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send({ error: 'Error en la consulta de reservaciones' });
        }
        if (!results.length) {
            console.log('No se encontraron resultados para:', selected_date);
            return res.status(404).send({ message: 'Reservaciones no encontradas' });
        }
        res.status(200).send(results);
    });
};




exports.updateReservation = (req, res) => {
    const { id } = req.params;
    const updatedData = new ReservationData(req.body).toObject();

    Reservation.updateReservation(id, updatedData, (error, results) => {
        if (error) {
            console.error('Error al actualizar reservaciones:', error);
            return res.status(500).send({ error: 'Error al actualizar reservacion' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Reservacion no encontrado' });
        }
        res.status(200).send({ message: 'Reservacion actualizada correctamente' });
    });
};

exports.deleteReservation = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: 'El ID de la reservación es requerido' });
    }

    Reservation.deleteReservation(id, (err, result) => {
        if (err) {
            console.error('Error al eliminar reservación:', err);
            return res.status(500).send({ error: 'Error al eliminar reservación' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Reservación no encontrada' });
        }

        res.status(200).send({ message: 'Reservación eliminada correctamente' });
    });
};


exports.getAvailableSchedules = (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).send({ error: 'La fecha es requerida' });
    }

    Reservation.getAvailableSchedules(date, (err, schedules) => {
        if (err) {
            console.error('Error al obtener horarios disponibles:', err);
            return res.status(500).send({ error: 'Error al obtener horarios disponibles' });
        }

        res.status(200).send({ availableSchedules: schedules });
    });
};




