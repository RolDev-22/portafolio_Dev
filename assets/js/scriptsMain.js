const btnMenu = document.querySelector("header button");
const nav = document.querySelector("header nav");
const links = document.querySelectorAll("header nav ul li a");

btnMenu.addEventListener("click", () => {
  nav.classList.toggle("actineNav");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("actineNav");
  });
});
