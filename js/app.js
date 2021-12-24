"use strict"; //modo estricto
import { Persona, Profesor, Alumno } from "./Persona.js"; //Clase exportada nominalmente (no por defecto)
import quitarEspaciosEnBlanco from "./functions.js"; //Función exportado por defecto
import clearwhiteSpaces from "./functions.js";
/**
 * Métodos y palabras reservadas de JS empleadas:
 * split() De un String genera un array
 * join()  De un Array genera un String
 * destructuración
 * propagación / spread 
 * Shadow DOM
 * forEach()
 * push()
 * test()
 * import
 * class
 * replace() Funciona para muchas cosas entre otras cosas sustituye caracteres a partir de una "Regular expression"
 */

// Constante global
const personas = [];

//Nodos
const myForm = document.querySelector("#myForm");
const nombreEl = document.querySelector("#nombre");
const fechNacimientoEl = document.querySelector("#date");
const apellidosEl = document.querySelector("#apellidos");
const outputEl = document.querySelector(".out__data");//Salida de datos para listar personas en HTML
const alertEl = document.querySelector(".alert");//Mensajes de error
const cargoEl = document.querySelector("#cargo");//Selector para si saber si la persona es estudiante/profesor
const otrosEl = document.querySelector("#otros");
const emailEl = document.querySelector("#email");
const hiddenEl = document.querySelector("#hidden");
const checkedAltaEl = document.querySelector("#alta");//Radio button de si el usuario es dado de alta o modificado su contenido


const ponerEnFormulario = index => {
    hiddenEl.value = index;
    nombreEl.value = personas[index].nombre;
    apellidosEl.value = personas[index].apellidos;
    emailEl.value = personas[index].email;
    otrosEl.value = personas[index].info;
    fechNacimientoEl.value = personas[index].fechaNacimiento;
}

/**
 * Pintando en pantalla de las personas creadas
 * @param {Array} personas - Array con objetos de tipo Persona para renderizar
 */
const render = personas => {
    //Comprobamos si existe el DOM Virtual en caso negativo lo montamos
    if (outputEl.shadowRoot === null)
        outputEl.attachShadow({ mode: 'open' });//Adjuntamos (attach) el Shadow Dom
    else
        outputEl.shadowRoot.innerHTML = "";
    //Añadimos todos los elementos
    personas.forEach((persona, indice) => {
        outputEl.shadowRoot.innerHTML += `<section data-id="persona_${indice}"><h2>${persona.constructor.name}</h2>${persona.toString()}</section>`;
    });
    //Capturamos el evento de hacer click en un elemento de la lista (datos de una persona) para colocar sus campos en el formulario
    outputEl.shadowRoot.querySelectorAll("section").forEach(
        element => {
            element.onclick = e => {
                //Seleccionamos la parte numérica conuna expresión regular
                ponerEnFormulario(Number(e.currentTarget.dataset.id.match(/\d+/g)))

            }
        }
    );    
}

/**
 * Modificar los datos de una persona dada de alta
 */
const modificarPersona = () => {
    const id = hiddenEl.value.length ? Number(hiddenEl.value) : null;
    if (id !== null) {
        personas[id].nombre = clearwhiteSpaces(nombreEl.value);
        personas[id].apellidos = clearwhiteSpaces(apellidosEl.value);
        personas[id].email = clearwhiteSpaces(emailEl.value);
        personas[id].info = otrosEl.value;
        const fecha = fechNacimientoEl.value.split("-");
        personas[id].setFechaNacimiento(...fecha);
    }
    render(personas);
}

/**
 * Función que instancia la clase Persona
 * @param {Array} datos - Datos del usuario obtenidos del formulario 
 */
const darAlta = (datos) => {
    //Desestructuración del array
    const [nombre = "Sin nombre", apellidos = "Sin apellidos", cargo = "", email = "", otros = ""] = datos;
    //Operador ternario comprobarmos qué cargo tiene la persona
    const p = cargo === 'Profesor' ? new Profesor({ nombre, apellidos, email, info: otros }) : new Alumno({ nombre, apellidos, email, info: otros });

    //La fecha
    // value =	Una DOMString que representa una fecha en el formato AAAA-MM-DD, o nada
    // Como lo que devuelve es "aaaa-mm-dd" convertir la cadena en un Array con split().
    //string.split("-") ---> [aaaa,mm,dd] 
    const fecha = fechNacimientoEl.value.split("-");
    //Operador spread (...Array) generamos una lista de valores a partir de un array.
    //NO CONFUNIDR CON ...rest que se utiliza la misma sintaxis aunque esta última nunca va en la invocación
    p.setFechaNacimiento(...fecha);
    // p.info = otros;
    // p.email = email;
    //array.push Añadir elementos a un array
    personas.push(p);
    //Añadimos una persona de forma manual
    // personas.push(
    //     new Persona({fechaNacimiento:new Date(1973,3,6),nombre:'Xurxo',apellidos:'González',email:'xurxo@webferrol.com',info:'Mola mucho'})
    // );
    render(personas);
    //reseteamos el formulario
    myForm.reset();
}

/**
 * Función para validar el formulario
 * @returns {Array} - Array con mensaje de errores
 */
const validate = () => {
    const errores = [];
    const nombre = nombreEl.value;
    const apellidos = apellidosEl.value;
    if (/^\s*$/.test(nombre)) {
        errores.push(`<div id="error-nombre" class="alert alert-danger error fs-6" role="alerta">El campo Nombre no puede estar vacío</div>`);
        nombreEl.focus(); //colocamos el cursor en el control de formulario
        return errores;
    }
    if (/^\s*$/.test(apellidos)) {
        errores.push(`<div id="error-apellidos" class="alert alert-danger error fs-6" role="alerta">El campo Apellidos no puede estar vacío</div>`); //colocalmos el cursor en el control de formulario
        apellidosEl.focus();
        return errores;
    }
    return errores;
}


/**
 * Capturamos el  evento del envío e iniciamos la aplicación
 * Invocación / llamada a funciones validate(), darAlta()
 * EVENTO onsubmit/submit. Se aplica sobre el formulario y no sobre el botón
 */
myForm.addEventListener(
    "submit",//String que nos dice cuál es el evento
    e => { // Object Evento
        e.preventDefault();
        //console.log(e.target.elements) //Podemos ver los elementos de los formularios
        alertEl.innerHTML = "";

        if (checkedAltaEl.checked) {
            const val = validate();
            if (val.length)
                alertEl.innerHTML = val.join("");
            else
                darAlta(
                    [
                        quitarEspaciosEnBlanco(nombreEl.value),
                        quitarEspaciosEnBlanco(apellidosEl.value),
                        cargoEl.options[cargoEl.selectedIndex].text,
                        quitarEspaciosEnBlanco(emailEl.value),
                        quitarEspaciosEnBlanco(otrosEl.value)
                    ]);
        } else if (personas.length) {
            const val = validate();
            if (val.length)
                alertEl.innerHTML = val.join("");
            else

                modificarPersona();
        } else {
            alertEl.innerHTML = `<div class="alert alert-danger error fs-6" role="alerta">Debe de seleccionar primero a una persona</div>`
        }
    }
);
