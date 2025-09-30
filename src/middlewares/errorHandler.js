module.exports = (err, req, res, next) => {
  // Log en consola para debug
  console.error(err);

  // Errores de Mongoose de validación
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
    return res.status(400).json({ error: 'ValidationError', message: 'Datos inválidos', details });
  }

  // Por defecto
  res.status(500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'Error interno del servidor',
  });
};
