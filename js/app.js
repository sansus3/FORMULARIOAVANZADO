import { clearBlankSpaces } from "./functions.js";

const form = document.querySelector("#myForm");
const inputNombre = document.querySelector("#nombre");
const inputApellidos = document.querySelector("#apellidos");
const inputEmail = document.querySelector("#email");
const outputAlert = document.querySelector(".alert");
 
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
            alert("dar de alta");
        }else{
            alert("Modificar")
        }
    }

}

