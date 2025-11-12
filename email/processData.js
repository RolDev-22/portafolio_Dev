import {
  numberSanitize,
  emailSanitize,
  initSpaceSanitize,
} from "../utils/dataSanitization.js";
import { sendMail } from "./sendMail.js";

export function processData(data) {
  if (!data) {
    return false;
  }

  const processedData = {
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };

  processedData.name = numberSanitize(processedData.name);
  processedData.email = emailSanitize(processedData.email);
  processedData.name = initSpaceSanitize(processedData.name);
  processedData.subject = initSpaceSanitize(processedData.subject);
  processedData.message = initSpaceSanitize(processedData.message);

  try {
    sendMail(processedData);
  } catch (error) {
    console.log("Error al enviar el correo: ", error.message);
    return false;
  }

  return true;
}
