const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reserva");
async function main() {
  try {
    await conectarBaseDatos();
    const reservas_salas_u7 = await Reserva.find({});
    console.table(
      reservas_salas_u7.map((reserva) => ({
        id: reserva._id.toString(),
        estudiante: reserva.estudiante,
        email: reserva.email,
        sala: reserva.sala,
        fecha: reserva.fecha,
        turno: reserva.turno,
        personas: reserva.personas
      })),
    );
    console.log("Total de reservas:", reservas_salas_u7.length);
  } finally {
    await desconectarBaseDatos();
  }
}
main().catch((error) => {
  console.error("No se pudo consultar las reservas:", error.name);
  console.error("Revisar configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
