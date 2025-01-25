const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido' });
        }

        // Guardar el payload (decodificado) del token en la request
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
