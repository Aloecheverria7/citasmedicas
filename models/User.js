const { db } = require('../server');

class User{
    static findByUsername(username, callback) {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return callback(err, null);
            }
            if (results.length > 0) {
                return callback(null, results[0]); // Devuelve el primer usuario encontrado
            } else {
                return callback(null, null); // Si no se encuentra el usuario
            }
        });
    }

    static createUser(data, callback) {
        const query = 'INSERT INTO  users SET ?';
        db.query(query, data, callback);
    }
}

module.exports = User;