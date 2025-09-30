const swaggerUi = require('swagger-ui-express');

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'API Productos',
    version: '1.0.0',
    description: 'CRUD de productos con Node.js, Express y MongoDB',
  },
  servers: [{ url: 'http://localhost:4000' }],
  components: {
    schemas: {
      Producto: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          stock: { type: 'integer' },
          category: { type: 'string', enum: ['alimentos', 'electronica', 'hogar', 'otros'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['name', 'price', 'stock'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
          details: { type: 'array', items: { type: 'object' } },
        },
      },
    },
  },
  paths: {
    '/productos': {
      get: {
        summary: 'Listar productos',
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Producto' } } } } } },
      },
      post: {
        summary: 'Crear producto',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } },
        },
        responses: {
          201: { description: 'Creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } } },
          400: { description: 'Validación', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/productos/{id}': {
      get: {
        summary: 'Obtener producto por id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } } },
          400: { description: 'ID inválido' },
          404: { description: 'No encontrado' },
        },
      },
      put: {
        summary: 'Actualizar producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Producto' } } } },
        responses: { 200: { description: 'OK' }, 400: { description: 'Validación/ID inválido' }, 404: { description: 'No encontrado' } },
      },
      delete: {
        summary: 'Eliminar producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Eliminado' }, 400: { description: 'ID inválido' }, 404: { description: 'No encontrado' } },
      },
    },
  },
};

function mountSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
}

module.exports = mountSwagger;
