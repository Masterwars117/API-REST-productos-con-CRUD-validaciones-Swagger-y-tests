module.exports = (req, res) => {
  res.status(404).json({ error: 'NotFound', message: `No se encontró ${req.originalUrl}` });
};
