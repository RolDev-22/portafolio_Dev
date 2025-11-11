const btnMenu = document.querySelector("header button");
const linksMenu = document.querySelectorAll("header nav ul li a");
const containerServiceCards = document.getElementById("contService");
const cards = document.querySelectorAll(".card-service");
const containerInput = document.querySelectorAll(".containerInput");

//**Para activar los labels de los inputs cuando estos tienen contenido al recargar la página*/
window.addEventListener("load", () => {
  document.querySelectorAll(".containerInput").forEach((container) => {
    //selecccionar y recorrer los contenedores
    container.querySelectorAll(".inputActive").forEach((input) => {
      //selecccionar y recorrer los inputs
      const label = input.previousElementSibling; //selecccionar el label asociado al input
      if (label && input.value.trim()) {
        //si el label y el input tienen contenido
        label.classList.add("selectedLabel");
      }
    });
  });
});

/***---------------------------EVENTOS---------------------------***/

//funcionalidad del botón del header que permite abrir y cerrar el menu
btnMenu.addEventListener("click", () => {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("activeNav");
});

//función que permite cerrar el menu al hacer click en alguno de los links del menú
linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("header nav");
    nav.classList.remove("activeNav");
  });
});

//función que permite activar la tarjeta al pasar el mouse por ella
containerServiceCards.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".card-service");

  if (card) {
    // Elimina la clase de todas las tarjetas
    document
      .querySelectorAll(".card-service")
      .forEach((c) => c.classList.remove("activeCard"));
    // Activa solo la tarjeta actual
    card.classList.add("activeCard");
  }
});

//función que permite activar la informacion de la tarjeta al hacer click esto para versión mobile
containerServiceCards.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    const card = e.target.closest(".card-service");

    if (card) {
      const p = card.querySelector(".p-service");

      if (p) {
        const isActive = p.classList.contains("activeInfo");
        // Desactiva todos los <p> activos
        document.querySelectorAll(".p-service.activeInfo").forEach((el) => {
          el.classList.remove("activeInfo");
        });

        // Si el actual no estaba activo, lo activa
        if (!isActive) {
          p.classList.add("activeInfo");
        }
      }
    }
  }
});

//función que permite activar el label al escribir en el input
containerInput.forEach((container) => {
  const input = container.querySelector(".inputActive");
  const label = container.querySelector(".labelTransform");

  // Agrega la clase selectedLabel al label si el input tiene contenido
  if (label && input.value.length > 0) {
    label.classList.add("selectedLabel");
  }

  // Agrega la clase selectedLabel al label cuando se enfoca el input
  input.addEventListener("focus", () => {
    input.style.borderColor = "var(--clr-4)";
    if (label) {
      label.classList.add("selectedLabel");
    }
  });

  // Quita la clase selectedLabel al label cuando se desenfoca el input y no tenga contenido
  input.addEventListener("blur", () => {
    input.style.borderColor = "var(--clr-5)";
    if (label && input.value.length === 0) {
      label.classList.remove("selectedLabel");
    }
  });
});
