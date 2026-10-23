const mongoose = require("mongoose");
const productoSchema = new mongoose.Schema(
 {
 nombre: { type: String, required: true, trim: true },
 categoria: { type: String, required: true, trim: true },
 precio: { type: Number, required: true, min: 1 },
 descripcion: { type: String, required: true, trim: true },
 },
 { collection: "productos" },
);
const Producto = mongoose.model("Producto", productoSchema);
module.exports = { Producto };