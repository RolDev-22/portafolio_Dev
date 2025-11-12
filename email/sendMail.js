export function sendMail(data) {
  return emailjs.send("service_tn2kwln", "template_2493m4c", {
    name: data.name,
    email: data.email,
    title: data.subject,
    message: data.message,
    time: new Date().toLocaleString(),
  });
}
