export class Persona {
    #nombre;
    #apellidos;
    #fechaNacimiento;
    info;
    email;
    /**
     * @description Métedo constructor que le pasamos los datos por 'Literal notation'
     * @param {object} obj - {nombre:string,apellidos:string,info:string,email:string,fechaNacimiento:Date} 
     */
    constructor(obj) {
        this.#nombre = obj.nombre?? "Sin nombre"; //Utilizamos Nullish coalescing operator (??)
        this.#apellidos = obj.apellidos??"";
        this.info = obj.info??'';
        this.email = obj.email??'';
        this.#fechaNacimiento=obj.fechaNacimiento??null;
    }
    /**
     * @description Getter para el nombre de la persona
     * @returns {string} - El nombre de la persona
     */
    get nombre() {
        return this.#nombre;
    }
    /**
     * @param {string} n - Nombre de la persona
     */
    set nombre(n) {
        this.#nombre = n;
    }
    /**
     * @description Getter para los apellidos de la persona
     * @returns {string} - Los apellidos de la persona
     */
    get apellidos() {
        return this.#apellidos;
    }
    /**
     * @param {string} n - Apellidos de la persona
     */
     set apellidos(a) {
        this.#apellidos = a;
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
     * Función que obtiene la fecha de nacimiento
     * @returns {string} - Fecha de nacimiento con forma aaaa-mm-dd
     */
    get fechaNacimiento() {
         //Para mostrar el mes correcto como con getMonth() devuelve 0-11 hay que sumar 1
         return (!this.#fechaNacimiento) ? "" : `${this.#fechaNacimiento.getFullYear()}-${('0' + (this.#fechaNacimiento.getMonth()+1)).slice(-2)}-${('0' + this.#fechaNacimiento.getDate()).slice(-2)}`
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