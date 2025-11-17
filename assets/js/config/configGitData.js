const GIT_USR = "RolDev-22";

/***
 * Obtiene los datos de los repositorios de GitHub del usuario especificado.
 * Filtra los repositorios que tienen una URL de homepage y obtiene información adicional,
 * incluyendo los lenguajes utilizados y la URL de una imagen de vista previa (preview.png) si existe.
 *
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos con los datos procesados de los repositorios.
 */
async function getDataGit() {
  try {
    // Obtener los repositorios del usuario
    const response = await fetch(
      `https://api.github.com/users/${GIT_USR}/repos`
    );
    const data = await response.json(); // Array de repositorios

    // Filtrar repositorios que tienen homepage
    const reposConHomepage = data.filter((repo) => repo.homepage);

    // Procesar cada repositorio para obtener lenguajes y preview.png
    const reposProcesados = await Promise.all(
      reposConHomepage.map(async (repo) => {
        const langs = await getLenguajes(repo);
        const langNames = Object.keys(langs).join(", ");
        const previewUrl = await getPreviewImageUrl(repo);

        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          languages: langNames,
          homepage: repo.homepage,
          preview: previewUrl,
        };
      })
    );

    return reposProcesados; // Array de objetos con los datos procesados
  } catch (error) {
    console.error("Error en extraer datos: ", error);
    return [];
  }
}

// Obtener los lenguajes de un repositorio procesados
function getLenguajes(repo) {
  return fetch(repo.languages_url).then((response) => response.json());
}

/**
 *
 * Obtiene la URL de la imagen de vista previa (preview.png) de un repositorio si existe.
 * Busca en el árbol de archivos del branch main del repositorio.
 *
 *
 * @param {*} repo
 * @returns
 */
async function getPreviewImageUrl(repo) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  try {
    // 1. Obtener info del branch main
    const branchRes = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches/main`,
      { headers }
    );
    const branchData = await branchRes.json();
    const treeSha = branchData.commit.commit.tree.sha;

    // 2. Obtener el árbol de archivos
    const treeRes = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${treeSha}?recursive=true`,
      { headers }
    );
    const treeData = await treeRes.json();

    // 3. Buscar preview.png
    const previewFile = treeData.tree.find((file) =>
      file.path.endsWith("preview.png")
    );

    if (!previewFile) return null;

    // 4. Construir el raw_url
    return `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/${previewFile.path}`;
  } catch (error) {
    console.error(`Error obteniendo preview.png de ${repo.name}:`, error);
    return null;
  }
}

export { getDataGit };
