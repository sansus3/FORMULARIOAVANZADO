import { clearBlankSpaces } from "./functions.js";
import Persona from "./Persona.js";

const form = document.querySelector("#myForm");
const inputNombre = document.querySelector("#nombre");
const inputApellidos = document.querySelector("#apellidos");
const inputEmail = document.querySelector("#email");
const inputInfo = document.querySelector("#otros");
const selectCargo = document.querySelector("#cargo");
const outputAlert = document.querySelector(".alert");
const outputData = document.querySelector(".out__data");
 
/**
 * @description Función que valida el formulario
 * @returns {boolean} - true si el formulario está validado 
 */
const validar = () => { //definición de la función
    const expReg = /^\s*$/;//expresión regular de tipo objeto que busca espacios en blanco
    let nombre = clearBlankSpaces(inputNombre.value);
    let apellidos = clearBlankSpaces(inputApellidos.value);
    //validamos nombre
    if(expReg.test(nombre)){
        outputAlert.innerHTML =
        "<div role=\"alert\" id=\"error-nombre\" class=\"alert alert-danger\">El campo nombre no puede estar vacío<div>";
        inputNombre.focus();
        return false;
    }
    //validamos apellidos
    if(expReg.test(apellidos)){
        outputAlert.innerHTML =
        "<div role=\"alert\" id=\"error-apellidos\" class=\"alert alert-danger\">El campo Apellidos no puede estar vacío<div>";
        inputApellidos.focus();
        return false;
    }
    //validar correo
    if(expReg.test(inputEmail.value)){
        outputAlert.innerHTML =
        "<div role=\"alert\" id=\"error-email\" class=\"alert alert-danger\">El campo Correo no puede estar vacío<div>";
        inputEmail.focus();
        return false;
    }
    return true;
}

/**
 * Dar de alta a un usuario
 */
const darAlta = () => {
    let nombre =  clearBlankSpaces(inputNombre.value);
    let apellidos = clearBlankSpaces(inputApellidos.value);
    let p1 = new Persona(nombre,apellidos);
    p1._email = inputEmail.value;
    let index = selectCargo.selectedIndex; //el indice numérico seleccinado por el usuario
    p1._cargo = selectCargo.options[index].text;
    p1._info = inputInfo.value;
    outputData.innerHTML += p1.toString();
    
    
}

form.onsubmit = ev => {
    //Parar el envío del formulario
    ev.preventDefault();
    //Capturamos radio button
    const chkAlta = document.querySelector("#alta");
    //limpio
    outputAlert.innerHTML = "";
    //Validar
    if(validar()){//true está validado.
        if(chkAlta.checked){//doy de alta
            darAlta();            
        }else{
            alert("Modificar")
        }
    }

}



