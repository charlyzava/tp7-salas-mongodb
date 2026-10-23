const mongoose = require("mongoose");
const reservaSchema = new mongoose.Schema(
    {
        estudiante: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        sala: { type: String, required: true, trim: true },
        fecha: { type: Date, required: true },
        turno: { type: String, required: true, trim: true },
        personas: { type: Number, required: true, min: 1 },
    },
    { collection: "reservas_salas_u7" },
);
const Reserva = mongoose.model("Reserva", reservaSchema);
module.exports = { Reserva };