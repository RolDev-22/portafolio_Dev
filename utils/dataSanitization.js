export function textSanitize(text) {
  // Elimina espacios en blanco al inicio
  texto = texto.trimStart();

  // Elimina números
  texto = texto.replace(/\d/g, "");

  // Elimina caracteres prohibidos
  texto = texto.replace(/[@\-\,;\*!¡\?\¿\{\}\[\]]/g, "");

  return texto;
}
