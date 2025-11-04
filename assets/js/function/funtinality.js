const btnMenu = document.querySelector("header button");
const linksMenu = document.querySelectorAll("header nav ul li a");
const containerServiceCards = document.getElementById("contService");
let activeCard;

btnMenu.addEventListener("click", () => {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("activeNav");
});

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("header nav");
    nav.classList.remove("activeNav");
  });
});

containerServiceCards.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".card-service");
  if (card) {
    card.classList.add("activeCard");
    activeCard = card;
  }
});

containerServiceCards.addEventListener("mouseout", (e) => {
  const card = e.target.closest(".card-service");
  if (card) {
    card.classList.remove("activeCard");
  }
});

console.log(activeCard);
