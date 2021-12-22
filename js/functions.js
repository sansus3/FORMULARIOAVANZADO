/**
 * Función que elimina espacios sobrantes de una cadena de texto
 * @param {string} str - Cadena de texto con el que operar 
 * @returns {string} - texto formateado
 */
 const clearwhiteSpaces = str => {
    const whiteSpaceStart = /^\s+/;  //con + Por lo menos debe de existir un espacio en blanco
    const whiteSpaceEnd = /\s+$/;
    const whiteSpace = /\s+/g;
    str = str.replace(whiteSpaceStart, "");
    str = str.replace(whiteSpaceEnd, "");
    str = str.replace(whiteSpace, " ");
    return str;

}

export default clearwhiteSpaces;