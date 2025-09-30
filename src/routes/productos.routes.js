const express = require('express');
const { body, param } = require('express-validator');

const ctrl = require('../controllers/productos.controller');

const router = express.Router();

// Validaciones comunes
const validarId = [param('id').isMongoId().withMessage('id debe ser un ObjectId válido')];

const validarCrear = [
  body('name').isString().isLength({ min: 3, max: 100 }).withMessage('name 3-100'),
  body('price').isFloat({ gt: 0 }).withMessage('price > 0'),
  body('stock').isInt({ min: 0 }).withMessage('stock >= 0'),
  body('category').optional().isIn(['alimentos', 'electronica', 'hogar', 'otros']).withMessage('category inválida'),
];

const validarActualizar = [
  body('name').optional().isString().isLength({ min: 3, max: 100 }).withMessage('name 3-100'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('price > 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('stock >= 0'),
  body('category').optional().isIn(['alimentos', 'electronica', 'hogar', 'otros']).withMessage('category inválida'),
];

// Middleware simple para responder 400 si hay errores de validación
const { validationResult } = require('express-validator');
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'Datos inválidos',
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// Rutas CRUD
router.get('/', ctrl.listar);
router.post('/', validarCrear, validateRequest, ctrl.crear);
router.get('/:id', validarId, validateRequest, ctrl.obtener);
router.put('/:id', [...validarId, ...validarActualizar], validateRequest, ctrl.actualizar);
router.delete('/:id', validarId, validateRequest, ctrl.eliminar);

module.exports = router;
