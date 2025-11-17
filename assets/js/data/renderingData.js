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

    article.classList.add("card-service", "card");
    figure.classList.add("ic-socials", "ic-cardService");

    img.src = card.icon; //asigna la url del icono
    img.alt = card.altImg; //asigna el alt del icono
    h2.textContent = card.title; //asigna el texto del h2
    p.textContent = card.description; //asigna el texto del p
    p.classList.add("p-service");
    article.style.background = `linear-gradient(rgba(0, 0, 0, .8)),url(${card.background}) no-repeat top/cover`;

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

export function renderGitHubRepos(repos) {
  const containerProyect = document.getElementById("contProjects"); //contenedor de los proyectos

  repos.forEach((repo) => {
    const article = document.createElement("article"); //crea el elemento article
    const h3 = document.createElement("h3"); //crea el elemento h3
    const p = document.createElement("p"); //crea el elemento p
    const ul = document.createElement("ul"); //crea el elemento ul
    const divBtns = document.createElement("div"); //crea el contenedor de los botones
    const btnVisit = document.createElement("a"); //crea el boton visitar
    const btnCode = document.createElement("a"); //crea el boton codigo

    article.classList.add("cardProject", "card");
    h3.classList.add("titleCardProject");
    p.classList.add("descritionProject");
    ul.classList.add("ulLenguaje");
    divBtns.classList.add("containerBtnsProject");
    btnVisit.classList.add("btn-class", "btn-project");
    btnCode.classList.add("btn-class", "btn-project");

    h3.textContent = repo.name;
    p.textContent = repo.description || "No description available.";

    //agrega los lenguajes a los li dentro del ul
    if (repo.languages) {
      repo.languages.split(",").forEach((lang) => {
        const liLang = document.createElement("li");
        liLang.textContent = lang.trim();
        ul.appendChild(liLang);
      });
    }

    //agrega la imagen de preview o una de fondo por defecto a las tarjetas de proyecto
    article.style.setProperty(
      "--preview-bg",
      `url(${repo.preview || "assets/img/FondoGen.jpg"})`
    );

    btnVisit.textContent = "Visitar";
    btnCode.textContent = "Código";
    btnVisit.href = repo.homepage;
    btnVisit.target = "_blank";
    btnCode.href = repo.html_url;
    btnCode.target = "_blank";

    divBtns.appendChild(btnVisit);
    divBtns.appendChild(btnCode);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(ul);
    article.appendChild(divBtns);

    containerProyect.appendChild(article);
  });
}
