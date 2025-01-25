const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserData = require('../models/UserData');  // Asegúrate de que UserData esté correctamente importado
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
    const createUserData = new UserData(req.body);  // Esta línea debería funcionar ahora

    bcrypt.hash(createUserData.password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al cifrar la contraseña:', err);
            return res.status(500).send({ error: 'Error al cifrar la contraseña' });
        }

        createUserData.password = hashedPassword;

        User.createUser(createUserData.toObject(), (error, results) => {
            if (error) {
                console.error('Error al crear el usuario:', error);
                return res.status(500).send({ error: 'Error al crear el usuario' });
            }

            res.status(201).send({
                message: 'Usuario creado exitosamente',
                userId: results.insertId
            });
        });
    });
};


exports.login = (req, res) => {
    const { username, password } = req.body;

    // 1. Buscar al usuario por el nombre de usuario
    User.findByUsername(username, (err, user) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).send({ error: 'Error al buscar el usuario' });
        }

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
        }

        // 2. Verificar si la contraseña coincide con el hash almacenado
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar la contraseña:', err);
                return res.status(500).send({ error: 'Error al comparar la contraseña' });
            }

            // Si las contraseñas no coinciden
            if (!isMatch) {
                return res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
            }

            // 3. Generar el token JWT
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            // Firmar el token con la clave secreta definida en .env
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            // 4. Enviar el token como respuesta
            res.status(200).send({
                message: 'Inicio de sesión exitoso',
                token: token
            });
        });
    });
};