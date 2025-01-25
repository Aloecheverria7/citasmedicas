const { db } = require('../server');

class Reservation {
    static createReservation(data, callback) {
        const query = 'INSERT INTO  reservations SET ?';
        db.query(query, data, callback);
    }

    static getReservation(callback) {
        const query = `
        SELECT *
        FROM reservations
        WHERE reservations.is_active = 1;

    `;
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    static getAllSchedules(callback) {
        const query = 'SELECT * FROM schedule_attending WHERE is_active = 1';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    

    static getReservationByDate(selected_date, callback) {
        const query = 'SELECT * FROM reservations WHERE selected_date = ? AND is_active = 1';
        db.query(query, [selected_date], callback);
    }
    

    static getAvailableSchedules(selected_date, callback) {
        this.getAllSchedules((err, allSchedules) => {
            if (err) return callback(err, null);

            this.getReservationByDate(selected_date, (error, reservations) => {
                if (error) return callback(error, null);

                const reservedSchedules = reservations.map(r => r.selected_schedule);
                const availableSchedules = allSchedules.filter(
                    schedule => !reservedSchedules.includes(schedule.time_slot)
                );

                callback(null, availableSchedules);
            });
        });
    }

    // Nuevo método: Verificar conflicto para una fecha y horario
    static checkConflict(selected_date, selected_schedule, callback) {
        const query = `
            SELECT * 
            FROM reservations
            WHERE selected_date = ? AND selected_schedule = ? AND is_active = 1
            LIMIT 1
        `;
        db.query(query, [selected_date, selected_schedule], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.length > 0); // Devuelve true si hay conflicto
        });
    }

    static updateReservation(id, data, callback) {
        // Validar que los datos requeridos están presentes
        if (!id || !data) {
            return callback(new Error("ID y datos son requeridos"));
        }
    
        const query = 'UPDATE reservations SET ? WHERE id = ?';
        
        // Ejecutar la consulta
        db.query(query, [data, id], (err, result) => {
            if (err) {
                return callback(err); // Manejar el error si ocurre
            }
            if (result.affectedRows === 0) {
                return callback(new Error("No se encontró el registro con ese ID"));
            }
            callback(null, result); // Llamar al callback con el resultado
        });
    }

    static deleteReservation(id, callback) {
        const query = 'UPDATE reservations SET is_active = 0 WHERE id = ?';
        db.query(query, [id], callback);
    }
    
    
}

module.exports = Reservation;