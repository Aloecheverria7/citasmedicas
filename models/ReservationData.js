class ReservationData{
    constructor({ full_name,phone_number,age,selected_date,selected_schedule,is_active,generated_by,created_date}){
        if (age < 15) {
            throw new Error('La edad debe ser mayor a 15 años');
        }
        this.full_name = full_name;
        this.phone_number = phone_number;
        this.age = age;
        this.selected_date = selected_date;
        this.selected_schedule = selected_schedule;
        this.is_active = is_active;
        this.generated_by = generated_by;
        this.created_date = created_date;
    }

    toObject(){
        return{
            full_name: this.full_name,
            phone_number: this.phone_number,
            age: this.age,
            selected_date: this.selected_date,
            selected_schedule: this.selected_schedule,
            is_active: this.is_active,
            generated_by: this.generated_by,
            created_date: this.created_date 
        }
    }

    toEmailObject() {
        return {
            full_name: this.full_name,
            phone: this.phone_number,
            age: this.age,
            hour: this.selected_schedule,
            date: this.selected_date
        }
    }

    toText() {
        return `
        Has recibido una cita, los datos del paciente a continuacion: \n\n
        Nombre: ${this.full_name}, \n
        Telefono: ${this.phone_number}, \n
        Edad: ${this.age}, \n
        Fecha elegida: ${this.selected_date}, \n
        Hora elegida: ${this.selected_schedule}. \n
        `
    }
}

module.exports = ReservationData;