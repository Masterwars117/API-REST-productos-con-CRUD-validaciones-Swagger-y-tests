const mongoose = require('mongoose');
const Producto = require('../models/producto.model');

// GET /productos
async function listar(req, res, next) {
  try {
    const data = await Producto.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

// POST /productos
async function crear(req, res, next) {
  try {
    const p = await Producto.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    next(err);
  }
}

// GET /productos/:id
async function obtener(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: 'ValidationError', message: 'id inválido' });

    const p = await Producto.findById(id);
    if (!p) return res.status(404).json({ error: 'NotFound', message: 'Producto no encontrado' });
    res.json(p);
  } catch (err) {
    next(err);
  }
}

// PUT /productos/:id
async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: 'ValidationError', message: 'id inválido' });

    const p = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!p) return res.status(404).json({ error: 'NotFound', message: 'Producto no encontrado' });
    res.json(p);
  } catch (err) {
    next(err);
  }
}

// DELETE /productos/:id
async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: 'ValidationError', message: 'id inválido' });

    const p = await Producto.findByIdAndDelete(id);
    if (!p) return res.status(404).json({ error: 'NotFound', message: 'Producto no encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, crear, obtener, actualizar, eliminar };
