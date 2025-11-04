const btnMenu = document.querySelector("header button");
const linksMenu = document.querySelectorAll("header nav ul li a");
const containerServiceCards = document.getElementById("contService");
const cards = document.querySelectorAll(".card-service");

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
    // Elimina la clase de todas las tarjetas
    document
      .querySelectorAll(".card-service")
      .forEach((c) => c.classList.remove("activeCard"));
    // Activa solo la tarjeta actual
    card.classList.add("activeCard");
  }
});

containerServiceCards.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    const card = e.target.closest(".card-service");

    if (card) {
      const p = card.querySelector(".p-service");

      if (p) {
        const isActive = p.classList.contains("activeInfo");

        // 🔄 Desactiva todos los <p> activos
        document.querySelectorAll(".p-service.activeInfo").forEach((el) => {
          el.classList.remove("activeInfo");
        });

        // ✅ Si el actual no estaba activo, lo activa
        if (!isActive) {
          p.classList.add("activeInfo");
        }
      }
    }
  }
});
