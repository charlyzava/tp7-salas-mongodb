//const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
//const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de Salas";
  next();
}

function validarReserva(req, res, next) {
  const valores = req.body ?? {};
  const estudiante = String (valores.estudiante??"").trim();
  const email = String (valores.email??"").trim();
  const sala = String (valores.sala??"").trim();
  const fecha = String (valores.fecha??"").trim();
  const turno = String (valores.turno??"").trim();
  const personasTexto = String (valores.personas??"");
  const personas = Number(personasTexto);

  const errores = [];

  if (!estudiante) {
    errores.push("El estudiante es obligatorio.");
  }

  if (!email) {
    errores.push("El email es obligatorio.");
  } else {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      errores.push("El email no tiene un formato válido.");
    }
  }

  if (!fecha) {
    errores.push("La fecha es obligatoria.");
  }

  if (!personasTexto) {
    errores.push("La cantidad de personas es obligatoria.");
  } else if (!Number.isInteger(personas) || personas < 1 || personas > 6) {
    errores.push(
      "La cantidad de personas debe ser un número entero entre 1 y 6.",
    );
  }

  if (!sala) {
    errores.push("Debes seleccionar una sala.");
  } else if (!salasPermitidas.includes(sala)) {
    errores.push("La sala seleccionada no es válida.");
  }

  if (!turno) {
    errores.push("Debes seleccionar un turno.");
  } else if (!turnosPermitidos.includes(turno)) {
    errores.push("El turno seleccionado no es válido.");
  }
if (
    !estudiante ||
    !email ||
    !sala ||
    !fecha ||
    !turno ||
    !personas
  ) {
  if (errores.length > 0) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      errores: "Completa todos los campos con valores validos.",
      valores,
    });
  }
}

  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas};
  next();
}
module.exports = { prepararAreaReservas, validarReserva };