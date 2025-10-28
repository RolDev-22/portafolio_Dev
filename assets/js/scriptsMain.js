const btnMenu = document.querySelector("header button");
const nav = document.querySelector("header nav");
const links = document.querySelectorAll("header nav ul li a");
const cards = document.querySelectorAll(".card-service");
let activeCardElement = null;

btnMenu.addEventListener("click", () => {
  nav.classList.toggle("actineNav");
});

let activeLinkElement = null;

if (links.length > 0) {
  activeLinkElement = cards[0];
  activeLinkElement.classList.add("activeCard");
}

window.onload = () => {
  const savedLinkId = localStorage.getItem("activeLinkId");

  links.forEach((link) => {
    // Restaurar el link activo si coincide con el guardado
    if (link.id === savedLinkId) {
      link.classList.add("activeLink");
      activeLinkElement = link;
    }
    link.addEventListener("click", () => {
      nav.classList.remove("actineNav");

      // Eliminar clase del anterior
      if (activeLinkElement) {
        activeLinkElement.classList.remove("activeLink");
      }

      link.classList.add("activeLink");
      activeLinkElement = link;
      localStorage.setItem("activeLinkId", link.id);

      links.forEach((link) => {
        link.addEventListener("click", () => {
          if (activeLinkElement) {
            activeLinkElement.classList.remove("activeLink");
          }
          link.classList.add("activeLink");
          activeLinkElement = link;
        });
      });
    });
  });
};

if (cards.length > 0) {
  activeCardElement = cards[0];
  activeCardElement.classList.add("activeCard");
}

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (activeCardElement) {
      activeCardElement.classList.remove("activeCard");
    }
    card.classList.add("activeCard");

    activeCardElement = card;
  });
});
