const GIT_USR = "RolDev-22";

/***
 * Obtiene los datos de los repositorios de GitHub del usuario especificado.
 * Filtra los repositorios que tienen una URL de homepage y obtiene información adicional,
 * incluyendo los lenguajes utilizados y la URL de una imagen de vista previa (preview.png) si existe.
 *
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos con los datos procesados de los repositorios.
 */
async function getDataGit() {
  const cache = localStorage.getItem("reposData");
  if (cache) {
    const { timestamp, data } = JSON.parse(cache);
    const oneHour = 60 * 60 * 1000;
    if (Date.now() - timestamp < oneHour) {
      return data;
    }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GIT_USR}/repos`
    );
    const data = await response.json();
    const reposConHomepage = data.filter((repo) => repo.homepage);

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

    localStorage.setItem(
      "reposData",
      JSON.stringify({
        timestamp: Date.now(),
        data: reposProcesados,
      })
    );

    return reposProcesados;
  } catch (error) {
    console.error("Error en extraer datos: ", error);
    return [];
  }
}

// Obtener los lenguajes de un repositorio procesados
function getLenguajes(repo) {
  const cacheKey = `langCache-${repo.full_name}`;
  const cache = localStorage.getItem(cacheKey);
  const oneDay = 24 * 60 * 60 * 1000;

  if (cache) {
    const { timestamp, data } = JSON.parse(cache);
    if (Date.now() - timestamp < oneDay) {
      return Promise.resolve(data);
    }
  }

  return fetch(repo.languages_url)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
      return data;
    });
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
  const cacheKey = `treeCache-${repo.full_name}`;
  const cache = localStorage.getItem(cacheKey);
  const oneDay = 24 * 60 * 60 * 1000;

  if (cache) {
    const { timestamp, data } = JSON.parse(cache);
    if (Date.now() - timestamp < oneDay) {
      return data;
    }
  }

  const headers = { Accept: "application/vnd.github.v3+json" };

  try {
    const branchRes = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches/main`,
      { headers }
    );
    const branchData = await branchRes.json();
    const treeSha = branchData.commit.commit.tree.sha;

    const treeRes = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${treeSha}?recursive=true`,
      { headers }
    );
    const treeData = await treeRes.json();

    const previewFile = treeData.tree.find((file) =>
      file.path.endsWith("preview.png")
    );

    const previewUrl = previewFile
      ? `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/${previewFile.path}`
      : null;

    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), data: previewUrl })
    );
    return previewUrl;
  } catch (error) {
    console.error(`Error obteniendo preview.png de ${repo.name}:`, error);
    return null;
  }
}

export { getDataGit };
