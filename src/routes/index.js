import { Router } from 'express';
const router = Router();

//importo los archivos de rutas para poder redirigir
import products from './products.js';
import cart from './cart.js';

//Rutas principales
router.use('/carrito', cart);
router.use('/productos', products);


export default router;
