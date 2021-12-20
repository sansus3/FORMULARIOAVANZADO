/**
 * Clase Persona
 */ 
export default class Persona{
    /**
     * @description Método constructor
     * @param {string} nombre - Nombre de pila
     * @param {string} apellidos - Apellidos
     */
    constructor(nombre="Anónimo",apellidos=""){
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._cargo = "";
        this._info = "Sin información";
        this._email = "";
        this._fechaNacimiento = new Date(); //Sin parámetros mete la fecha actual del sistema


    }

    /**
     * @description Método que saca en lista desordenada de HTML información de la persona
     * @returns {string} - Info de los campos de la persona
     */
    toString(){
        const datos = `
        <ul class="campos">
            <li class="campo">
            <mark>Nombre:</mark><em>${this._nombre}</em>
            </li>
            <li class="campo">
            <mark>Apellidos:</mark><em>${this._apellidos}</em>
            </li>
            <li class="campo">
            <mark>Correo:</mark><em>${this._email}</em>
            </li>
            <li class="campo">
            <mark>Cargo:</mark><em>${this._cargo}</em>
            </li>
            <li class="campo">
            <mark>Otros:</mark><em>${this._info}</em>
            </li>
        </ul>
        `;

        return datos;
    }
}