export function numberSanitize(number) {
  return number.replace(/\d/g, "");
}

export function emailSanitize(email) {
  const patternMail = /^[^\s][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.replace(patternMail, "");
}

export function initSpaceSanitize(text) {
  return text.trimStart();
}
