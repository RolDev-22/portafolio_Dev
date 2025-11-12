import { processData } from "../../../email/processData.js";
const form = document.getElementById("formContact");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputAffair = document.getElementById("inputAffair");
const inputMessage = document.getElementById("inputMessage");
const btnSubmit = document.getElementById("btnFormSubmit");

const controlCheck = {
  inputName: false,
  inputAffair: false,
  inputEmail: false,
  inputMessage: false,
};

const inputs = [inputName, inputEmail, inputAffair, inputMessage];

//**Para recuperar mensajes desde el local storage al regarcar la pagina */
window.addEventListener("load", () => {
  inputs.forEach((input) => {
    restoreDataFromLocalStorage(input);
    const skipVerification =
      input.id === "inputEmail" || input.id === "inputMessage";
    verificationFomrInputs(input, skipVerification);
  });
  updateBtnSubmit(validateForm());
});

/** Recorre los inputs para escuchar los eventos */
inputs.forEach((input) => {
  const skipVerification =
    input.id === "inputEmail" || input.id === "inputMessage";
  input.addEventListener("input", () => {
    verificationFomrInputs(input, skipVerification);
    updateBtnSubmit(validateForm());
  });
});

//**Control para enviar el formulario una vez que ya cumple las validaciones */
form.addEventListener("submit", (e) => {
  e.preventDefault(); //para que no se recargue la pagina
  if (validateForm()) {
    //si cumple las condiciones
    const response = processData({
      name: inputName.value,
      email: inputEmail.value,
      subject: inputAffair.value,
      message: inputMessage.value,
    });
    resetForm(); //resetea los inputs
    resetControlCheck(); //resetea el controlCheck
    updateBtnSubmit(false); //desactiva el boton submit

    openModalWithSpinner("Su mensaje ha sido enviado", response); //abre el modal
    inputs.forEach((input) => {
      localStorage.removeItem(input.id);
    });
    //reloadPage();
  }
});

/***---------------------------FUNCIONES---------------------------****/

/** Función que permite activar o desactivar el boton submit según las validaciones */
function updateBtnSubmit(validate) {
  btnSubmit.disabled = !validate;
  btnSubmit.classList.toggle("enabledBtn", validate);
}

/** Función que permite abrir y cerrar el modal */
function openModalWithSpinner(msgModal, response) {
  const modal = document.getElementById("modalContactId");
  const modalBody = document.getElementById("modalBodyId");
  const span = modalBody.querySelector("span");

  span.classList.add("spinnerActive");
  modal.classList.add("modalActive");

  setTimeout(() => {
    span.classList.remove("spinnerActive");
    showModalMessage(response ? msgModal : "Ha ocurrido un error");
  }, 2000);
}

/** Función que permite mostrar un mensaje en el modal */
function showModalMessage(msg) {
  const modalBody = document.getElementById("modalBodyId");
  const p = modalBody.querySelector("p");
  p.textContent = msg;

  setTimeout(() => {
    closeModal();
  }, 2000);
}

/** Función que permite cerrar el modal */
function closeModal() {
  const modal = document.getElementById("modalContactId");
  modal.classList.remove("modalActive");
}

/** Función que permite resetear valores de los inputs */
function resetForm() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

/**Función que verifica los textos del formulario*/
function verificationFomrInputs(input, skipVerification) {
  const patternMail = /^[^\s][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  let msg = "";
  if (input.value.length > 0 && input.value.length < 3) {
    msg = "El campo debe tener al menos 3 caracteres";
  }
  if (input.value.startsWith(" ")) {
    msg = "El campo no puede iniciar con un espacio";
  }
  if (/\d/.test(input.value) && !skipVerification) {
    msg = "El campo no puede contener numeros";
  }
  if (
    input.id === "inputEmail" &&
    input.value.length > 0 &&
    !patternMail.test(input.value)
  ) {
    msg = "El campo debe ser un email";
  }

  !msg && input.value.length !== 0
    ? checkControl(input, true)
    : checkControl(input, false);

  insertMessage(input, msg);
}

/** Función para insertar mensaje en el span asociado al input*/
function insertMessage(input, message) {
  const span = input.nextElementSibling;
  span.textContent = message;
  saveDataToLocalStorage(input, message);
}

/** Función para guardar los mensajes y datos de los inputs en el localStorage
 * para un manejo de datos persistentes
 */
function saveDataToLocalStorage(input, msg) {
  const data = {
    value: input.value,
    msg: msg,
  };
  localStorage.setItem(input.id, JSON.stringify(data)); //guardar el objeto en el localStorage
}

/** Función para recuperar los mensajes y datos de los inputs del localStorage
 * para un manejo de datos persistentes
 */
function restoreDataFromLocalStorage(inputRestore) {
  const span = inputRestore.nextElementSibling;

  try {
    const dataRestored = localStorage.getItem(inputRestore.id);
    const data = JSON.parse(dataRestored);
    inputRestore.value = data.value;
    span.textContent = data.msg;
  } catch (error) {
    span.textContent = "";
    return error.message;
  }
}

/** Función para controlar el estado de los inputs */
function checkControl(inpt, condition) {
  controlCheck[inpt.id] = condition;
}

/** Función que permite validar el formulario */
function validateForm() {
  return (
    controlCheck.inputName &&
    controlCheck.inputAffair &&
    controlCheck.inputEmail &&
    controlCheck.inputMessage
  );
}

/** Función que permite resetear el estado de validación de los inputs */
function resetControlCheck() {
  for (let key in controlCheck) {
    controlCheck[key] = false;
  }
}

/** Función que permite recargar la pagina */
function reloadPage() {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
