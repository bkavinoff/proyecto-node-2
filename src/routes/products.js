import { Router } from 'express';
const router = Router();

//importo el controller de productos
import { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } from '../controllers/products.js';

//importo el checkAuth para verificar si el usuario tiene permisos de escritura para productos
import { checkAuth } from '../middlewares/checkAuth.js';

//Obtener todos los productos
router.get('/', getProducts);

//Obteber un producto por id
router.get('/:id', getProductById);

//Agregar un producto
router.post('/', checkAuth, saveProduct);

//Actualizar un producto por id
router.put('/:id', checkAuth, updateProduct);

//Eliminar un producto por id
router.delete('/:id', checkAuth, deleteProduct);

export default router;