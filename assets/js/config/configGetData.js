const route = "docs/mainInfo.json";

export async function getData() {
  try {
    const response = await fetch(route);
    if (!response.ok)
      throw new Error(`Error al cargar JSON: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error de fecth data: ", error.message);
    return [];
  }
}
