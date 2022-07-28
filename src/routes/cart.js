import { Router } from 'express';
const router = Router();

//traigo el controller de carritos:
import { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } from '../controllers/cart.js';

//Crear carrito
router.post('/', newCart);

//eliminar carrito por ID
router.delete('/:id', deleteCart);

//obtenger el listado de productos de un carrito por id de carrito
router.get('/:id/productos', getProductsCart);

//agregar un producto al carrito segun id
router.post('/:id/productos/:id_prod', saveProductsCart);

//Eliminar un producto de un carrito según sus id
router.delete('/:id/productos/:id_prod', deleteProductCart);

export default router;