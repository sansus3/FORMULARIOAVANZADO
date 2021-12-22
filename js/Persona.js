export class Persona {
    #nombre;
    #apellidos;
    #fechaNacimiento;
    info;
    email;
    /**
     * @description Método constructor {nombre,apellidos,info,email,fechaNacimiento}
     * @param {object} obj - objeto literal. Utilizamos Nullish coalescing operator (??)
     */
    constructor(obj) {
        this.#nombre = obj.nombre?? "Sin nombre";
        this.#apellidos = obj.apellidos??"";
        this.info = obj.info??'';
        this.email = obj.email??'';
        this.#fechaNacimiento=obj.fechaNacimiento??null;
    }
    /**
     * @description Getter para el nombre de la persona
     * @returns {string} - El nombre de la persona
     */
    getNombre() {
        return this.#nombre;
    }
    /**
     * @description Getter para los apellidos de la persona
     * @returns {string} - Los apellidos de la persona
     */
    getApellidos() {
        return this.#apellidos;
    }
    /**
     * @description Introduce la fecha de nacimiento de la persona en formato Date.      * 
     * @param {string|number} aaaa - Año
     * @param {string|number} mm - Mes.
     * @param {string|number} dd - Día
     */
    setFechaNacimiento(aaaa,mm,dd) {
        this.#fechaNacimiento = aaaa && !isNaN(aaaa) ? new Date(aaaa,mm-1,dd):undefined; //mm-1 porque Date() lo almacena como de 0 a 11
    }

    /**
     * @description Edad de la persona calculada a partir de la fecha de nacimiento
     * @returns {Number} - Edad de la persona
     */
    dimeEdad() {        
        const diff = Date.now()-this.#fechaNacimiento;
        const date = new Date();
        return (!this.#fechaNacimiento) ? 0 : Math.floor(diff/(1000*60*60*24*365));
    }
    /**
     * Función que obtiene la fecha de nacimiento
     * @returns {string} - Fecha de nacimiento con forma dd/mm/aaaa
     */
    dimeFechaNacimiento() {
        //Para mostrar el mes correcto como con getMonth() devuelve 0-11 hay que sumar 1
        return (!this.#fechaNacimiento) ? "" : `${this.#fechaNacimiento.getDate()}/${this.#fechaNacimiento.getMonth()+1}/${this.#fechaNacimiento.getFullYear()}`
    }
    /**
     * @description Obtiene la información de todos los campos de la clase Persona
     * @returns {string} - Datos de la persona
     */
    toString() {
        return `
            <div class="field">Nombre: ${this.#nombre}</div>
            <div class="field">Apellidos: ${this.#apellidos}</div>
            <div class="field">Correo electrónico: ${this.email}</div>
            <div class="field">Fecha de Nacimiento: ${this.dimeFechaNacimiento()}</div>
            <div class="field">Años: ${this.dimeEdad()}</div>
            <div class="field">Otros: ${this.info}</div>
        `
    }
}


export class Profesor extends Persona{

}

export class Alumno extends Persona{

}