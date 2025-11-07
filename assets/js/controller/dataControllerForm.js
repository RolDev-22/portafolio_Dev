const dataName = document.getElementById("inputName");
const dataEmail = document.getElementById("inputEmail");
const dataAffair = document.getElementById("inputAffair");
const patternMail = /^[^\s][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
let msg = "";

window.onload = () => {
  restoreFromLocalStorage(dataName);
  restoreFromLocalStorage(dataAffair);
  restoreFromLocalStorage(dataEmail);
};

//Control para la inserción de los mensajes relacionados al input de nombre
dataName.addEventListener("input", () => {
  msg = validText(dataName.value);
  insertMessage(dataName, msg);
  saveToLocalStorage("inputName", dataName.value, msg);
});

//Control para la inserción de los mensajes relacionados al input de asunto
dataAffair.addEventListener("input", () => {
  msg = validText(dataAffair.value);
  insertMessage(dataAffair, msg);
  saveToLocalStorage("inputAffair", dataAffair.value, msg);
});

//Control para la inserción de los mensajes relacionados al input de correo
dataEmail.addEventListener("input", () => {
  const msgEmail =
    !patternMail.test(dataEmail.value) && dataEmail.value != ""
      ? "Formato de correo incorrecto."
      : "";

  insertMessage(dataEmail, msgEmail);
  saveToLocalStorage("inputEmail", dataEmail.value, msgEmail);
});

/**Funcion que permite inserta el mensaje de error en los span de los inputs que se están escribiendo
 *
 * @param {input} inputSelected //Input que se esta escribiendo
 * @param {string} msg //Mensaje de error
 */
function insertMessage(inputSelected, msg) {
  const span = inputSelected.parentElement.querySelector("span");
  span.textContent = msg;
}

/**
 * Función que pérmite verificar el texto que se esta escribiendo
 * comprueba inicio con espacios, numeros y longitud
 *
 * @param {*} textInput //Texto que se esta escribiendo
 * @returns
 */
function validText(textInput) {
  let msgValid = "";
  //Si el texto empieza con espacio
  if (textInput.startsWith(" ")) {
    msgValid = "No puede empezar con espacios en blanco.";
    //Si el texto contiene numeros
  } else if (includeNumber(textInput)) {
    msgValid = "No puede contener numeros.";
    //Si el texto es menor a 3 y no esta vacio
  } else if (textInput.length < 3 && textInput.length != "") {
    msgValid = "Debe tener al menos 3 caracteres.";
  }

  return msgValid;
}

//Función que permite verificar si el texto continen numeros
function includeNumber(text) {
  return /\d/.test(text);
}

//Función que permite guardar los datos en el localStorage
function saveToLocalStorage(inputId, value, errorMsg) {
  localStorage.setItem(inputId, JSON.stringify({ value, errorMsg }));
}

//Función que permite recuperar los datos del localStorage
function restoreFromLocalStorage(inputElement) {
  const saved = localStorage.getItem(inputElement.id);
  if (saved) {
    const { value, errorMsg } = JSON.parse(saved);
    inputElement.value = value;
    insertMessage(inputElement, errorMsg);
  }
}
