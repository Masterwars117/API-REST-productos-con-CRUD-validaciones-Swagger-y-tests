const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    price: { type: Number, required: true, min: 0.01 },
    stock: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['alimentos', 'electronica', 'hogar', 'otros'],
      default: 'otros',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);
