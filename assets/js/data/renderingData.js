/*
 **
 *
 * @param {array} habilities
 *
 * Función que permite el renderizado dinámico de las habilidades, en la sección de home
 */
export function renderHabilities(InfoHabilities) {
  const contHabilities = document.getElementById("contHabilities"); //contenedor de las habilidades

  InfoHabilities.forEach((hability) => {
    //recorre el array de habilidades
    const h3 = document.createElement("h3"); //crea el elemento h3
    h3.textContent = hability; //asigna el texto de la habilidad
    contHabilities.appendChild(h3); //agrega el h3 al contenedor
  });
}

/*
 **
 * @param {array} icon array de iconos
 *
 * Función que permite el renderizado dinámico de los iconos de redes sociales, en la sección de contacto
 * sección home y footer
 */
export function renderIcon(infoIcon) {
  const ulSocials = document.querySelectorAll(".ulSocials"); //ul que contenedor de los iconos
  ulSocials.forEach((us) => {
    //recorre los ul en las secciones
    infoIcon.forEach((icon) => {
      //recorre el array de iconos
      const a = document.createElement("a"); //crea un enlace a que contendra el icono y la información relevante
      const img = document.createElement("img"); //crea el icono tipo imagen que esta dentro del enlace a
      const span = document.createElement("span"); // span que contiene la informacion relevante a la red social
      img.src = icon.img; //asigna la url del icono
      img.alt = icon.altImg; //asigna el alt del icono
      img.classList.add("ic-socials"); //asigna la clase del icono que se usa en el css
      span.textContent = icon.span; //asigna el texto del span proveniente del json
      a.href = icon.link; //asigna la url del enlace para abrir la red social
      a.target = "_blank";
      a.appendChild(img);
      a.appendChild(span);
      us.appendChild(a); //agrega el contenido al cntenedor principal
    });
  });
}

/*
 **
 * @param {array} skill array de habilidades
 *
 * Función que permite el renderizado dinámico de las skill, en la sección de sobre mi
 */
export function renderSkill(InfoSkill) {
  const contSkill = document.getElementById("contSkill"); //contenedor de las habilidades
  InfoSkill.forEach((skill) => {
    //recorre el array de habilidades

    const li = document.createElement("li"); //crea el elemento li
    const img = document.createElement("img"); //crea el elemento img

    li.classList.add("li-skill");
    img.classList.add("ic-skill");

    img.src = skill.ic; //asigna la url del icono
    img.alt = skill.alt; //asigna el alt del icono
    li.textContent = skill.skill; //asigna el texto de la habilidad

    li.prepend(img);
    contSkill.appendChild(li); //agrega el li al contenedor
  });
}

export function renderCard(infoCard) {
  const contService = document.getElementById("contService"); //contenedor de las habilidades
  infoCard.forEach((card) => {
    //recorre el array de servicios
    const article = document.createElement("article"); //crea el elemento article
    const figure = document.createElement("figure"); //crea el elemento figure
    const img = document.createElement("img"); //crea el elemento img
    const h2 = document.createElement("h2"); //crea el elemento h2
    const p = document.createElement("p"); //crea el elemento p
    const button = document.createElement("button"); //crea el elemento button

    article.classList.add("card-service", "card");
    figure.classList.add("ic-socials", "ic-cardService");

    img.src = card.icon; //asigna la url del icono
    img.alt = card.altImg; //asigna el alt del icono
    h2.textContent = card.title; //asigna el texto del h2
    p.textContent = card.description; //asigna el texto del p
    p.classList.add("p-service");

    figure.appendChild(img);
    article.appendChild(figure);
    article.appendChild(h2);
    article.appendChild(p);
    contService.appendChild(article); //agrega el li al contenedor
  });

  //activa la primera tarjeta por defecto
  const cards = document.querySelectorAll(".card-service");
  if (cards.length > 0) {
    cards[0].classList.add("activeCard");
  }
}
