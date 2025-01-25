class UserData {
    constructor({ username, password, role }) {
        if (password.length < 10) {
            throw new Error('La contraseña debe tener al menos 10 caracteres');
        }

        const validRoles = ['master', 'admin', 'assist'];
        if (!validRoles.includes(role)) {
            throw new Error('Rol inválido. Los roles permitidos son: master, admin, assist');
        }

        this.username = username;
        this.password = password;
        this.role = role;
    }

    toObject() {
        return {
            username: this.username,
            password: this.password,
            role: this.role
        };
    }
}

module.exports = UserData;
