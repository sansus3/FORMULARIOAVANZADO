/**
 * @description Función que limpia los espacios en blanco: tabulaciones, barra espaciadora, intro
 * @param {String} text - Texto bruto con espacios en blanco
 * @returns {String} - Texto formateado sin espacios en blanco
 */
// const clearBlankSpaces = text => {    
//     text = text.replace(/^\s+/,"");
//     text = text.replace(/\s+$/,"");
//     return text = text.replace(/\s+/g," ");
// }
const clearBlankSpaces = text => (text = text.replace(/^\s+|\s+$/, "")) && (text = text.replace(/\s+$/, "")) && (text = text.replace(/\s+/g, " "));

/**
 * @description Función que devuelve un número aleatorio entre dos números enteros
 * @param {Number} min - Número entero mínimo de la serie
 * @param {Number} max - Número entero máximo de la serie 
 * @returns {Number} - Número aleatorio entre max y min, ambos incluidos
 */
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @description Función que determina el número más pequeño
 * @param  {...Number} numeros - Parámetro rest
 * @returns {Number} - Retorna el número menor mínimo
 */
const getMin = (...numeros) => numeros.reduce((anterior, actual) => anterior < actual ? anterior : actual);

/**
 * @description Función que determina el número más grande
 * @param  {...Number} numeros - Parámetro rest
 * @returns {Number} - Retorna el número mayor máximo
 */
const getMax = (...numeros) => numeros.reduce((anterior, actual) => anterior > actual ? anterior : actual);


export { clearBlankSpaces, getRandom, getMin, getMax }; //Las exportaciones por defecto puede coger cualquier nombre
