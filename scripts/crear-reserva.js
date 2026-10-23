const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reserva");
async function main() {
  try {
    await conectarBaseDatos();
    const reserva = await Reserva.create({
      estudiante: "Rutger Hauer",
      email: "batty1982@gmail.com",
      sala: "Sala Sur",
      fecha: "2026-09-21",
      turno: "Noche",
      personas: 5,
    });
    console.log("Reserva guardada. _id:", reserva._id.toString());
  } finally {
    await desconectarBaseDatos();
  }
}
main().catch((error) => {
  console.error("No se pudo crear la reserva:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
