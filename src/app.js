const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productosRouter = require('./routes/productos.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// 👉 Documentación Swagger
const mountSwagger = require('./docs/swagger');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // body parser para JSON
app.use(morgan('dev'));  // logs de cada request

// Healthcheck (para saber si la API responde)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Documentación Swagger en /docs
mountSwagger(app);

// Rutas principales de negocio
app.use('/productos', productosRouter);

// Middlewares de errores
app.use(notFound);       // 404
app.use(errorHandler);   // Manejo centralizado de errores

// Exporta la instancia de express
module.exports = app;

