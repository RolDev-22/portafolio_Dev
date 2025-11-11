const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputAffair = document.getElementById("inputAffair");
const inputMessage = document.getElementById("inputMessage");
const btnFormSubmit = document.getElementById("btnFormSubmit");
const btnCloseModal = document.getElementById("btnCloseModal");

const controlCheck = {
  inputName: false,
  inputAffair: false,
  inputEmail: false,
  inputMessage: false,
};

//**Para recuperar mensajes desde el local storage al regarcar la pagina */
window.addEventListener("load", () => {
  restoreDataFromLocalStorage(inputName);
  restoreDataFromLocalStorage(inputAffair);
  restoreDataFromLocalStorage(inputEmail);
  restoreDataFromLocalStorage(inputMessage);
});

inputName.addEventListener("input", () => {
  verificationFomrInputs(inputName, false);
});

inputEmail.addEventListener("input", () => {
  verificationFomrInputs(inputEmail, true);
});

inputAffair.addEventListener("input", () => {
  verificationFomrInputs(inputAffair, false);
});

inputMessage.addEventListener("input", () => {
  verificationFomrInputs(inputMessage, true);
});

btnFormSubmit.addEventListener("click", () => {
  modalFunction();
});

btnCloseModal.addEventListener("click", () => {
  modalFunction();
});

/***---------------------------FUNCIONES---------------------------****/

/** Función que permite abrir y cerrar el modal */
function modalFunction() {
  const modal = document.getElementById("modalContact");
  if (modal.classList.contains("modalActive")) {
    modal.classList.remove("modalActive");
    return;
  }
  modal.classList.add("modalActive");
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

  console.log(validateForm());

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

  if (!msg) {
    localStorage.removeItem(input.id);
    return;
  }
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

function checkControl(inpt, condition) {
  controlCheck[inpt.id] = condition;
}

function validateForm() {
  return (
    controlCheck.inputName &&
    controlCheck.inputAffair &&
    controlCheck.inputEmail &&
    controlCheck.inputMessage
  );
}
