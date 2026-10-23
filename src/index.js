const path = require("node:path");
const { leerJson } = require("./archivos");
const { leerConfiguracion } = require("./config/entorno");
const { crearServicioProductos } = require("./servicios/productos");
const { crearApp } = require("./app");
const rutaDatos = path.join(__dirname, "..", "datos", "productos.json");
async function main() {
 const { puerto, formatoRegistro } = leerConfiguracion();
 const productosIniciales = await leerJson(rutaDatos);
 const servicioProductos = crearServicioProductos(productosIniciales);
 const app = crearApp({ servicioProductos, formatoRegistro });
 app.listen(puerto, () => {
 console.log(`Aplicación disponible en http://localhost:${puerto}`);
 });
}
main().catch((error) => {
 console.error("No se pudo iniciar la aplicación:", error);
 process.exitCode = 1;
});