const { Router } = require('express');
const ProductosRouter = require('./productos');

const rutaPrincipal = Router();

router.use('/productos', ProductosRouter);

module.exports = rutaPrincipal;