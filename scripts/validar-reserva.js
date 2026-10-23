const { Reserva } = require("../src/modelos/reserva");
async function main() {
  const reserva = new Reserva({
    estudiante: "Harrison Deckard",
    email: "harrisoncontact@gmail.com",
    sala: "Sala 1",
    fecha: new Date(),
    turno: "Mañana",
    personas: 5,
  });
  await reserva.validate();
  console.log("Datos válidos; todavía no guardamos en MongoDB.");
}
main().catch((error) => {
  console.error("Validación rechazada:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  process.exitCode = 1;
});
