const GIT_USR = "RolDev-22";

async function getDataGit() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GIT_USR}/repos`
    );
    const data = await response.json();

    data.map(async (repo) => {
      if (repo.homepage) {
        const languages = await fetchLanguages(repo.languages_url);
        repo.languages_url = Object.keys(languages).join(", ");
        const branches = repo.branches_url.replace("{/branch}", "");
        const urlImage = await fetchUrlImage(branches);
        repo.urlImage = urlImage;
        return (
          repo.name,
          repo.languages_url,
          repo.html_url,
          repo.description,
          repo.homepage,
          repo.urlImage || "assets/img/FondoGen.jpg"
        );
      }
    });
  } catch (error) {
    console.error("Error en extraer datos: ", error);
    return [];
  }
}

//funcion para obtener todos los lenguajes asociados al proyecto de un repositorio
async function fetchLanguages(languagesUrl) {
  const response = await fetch(languagesUrl);
  return await response.json();
}

async function fetchUrlImage(branches) {
  const response = await fetch(branches);
  const data = await response.json();
  const defaultBranch =
    data.find((branch) => branch.name === "main") || data[0];
  const urlImg = defaultBranch.commit.url;
  const responseImg = await fetch(urlImg);
  const dataImg = await responseImg.json();
  const rawImage = dataImg.files.find(
    (file) => file.filename === "preview.png"
  ).raw_url;

  return rawImage;
}

export { getDataGit };
