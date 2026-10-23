const path = require("node:path");
const { leerJson } = require("./archivos");
const { leerConfiguracion } = require("./config/entorno");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");
const rutaDatos = path.join(__dirname, "..", "datos", "reservas.json");
async function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const reservasIniciales = await leerJson(rutaDatos);
  const servicioReservas = crearServicioReservas(reservasIniciales);
  const app = crearApp({ servicioReservas, formatoRegistro });
  app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });
}
main().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;
});