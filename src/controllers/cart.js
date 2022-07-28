import { CarritoDao as carts} from '../daos/index.js';
import { ProductDao as products} from '../daos/index.js';

const newCart = async (req, res) => {
    try {
        //genero un carrito vacío
        const newCart = { timestamp: new Date(Date.now()), productos: [] };
        
        //guardo el carrito generado
        let id = await carts.save(newCart);

        res.status(201).json(`Se ha creado correctamente el carrito con id: ${id}`);

    } catch (err) { 
        res.status(500).json({ error: err });
    }
}

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;

        //busco el carrito segun id
        const cart = await carts.getById(id);

        if (!cart) {
            throw `No existe carrito con id: ${id}`;
        }
        
        //existe entonces lo elimino
        await carts.deleteById(id);

        res.status(200).json(`Se ha eliminado correctamente el carrito con id: ${id}`);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getProductsCart = async (req, res) => {
    try {
        const id = req.params.id;

        //busco el carrito segun id
        const cart = await carts.getById(id);

        if (!cart) {
            throw `No existe carrito con id: ${id}`;
        }

        //existe entonces devuelvo los productos
        res.status(200).json(cart.productos);
    } catch (err) { 
        res.status(500).json({ error: err });
    }
}

const saveProductsCart = async (req, res) => {
    try {
        const id_prod = req.params.id_prod;
        const id_cart = req.params.id;

        //busco el carrito segun id
        const cartFound = await carts.getById(id_cart);
        if (!cartFound) {
            throw `No existe carrito con id: ${id_cart}`;
        }
        
        //busco el producto segun id
        const product = await products.getById(id_prod);
        if (!product) {
            throw `No existe producto con id: ${id_prod}`;
        }
        
        //verifico si hay stock
        if (product.stock == 0) {
            throw 'No hay stock del producto';
        }

        //agrego el producto al carrito
        cartFound.productos.push(product)

        //actualizo el carrito
        await carts.updateById(id_cart, cartFound)

        res.status(200).json('Se agregó el producto al carrito');

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteProductCart = async (req, res) => {
    const id_prod = req.params.id_prod;
    const id_cart = req.params.id;

    try {
        //busco el carrito segun id
        let cartFound = await carts.getById(id_cart);
        if (!cartFound) {
            throw `No existe carrito con id: ${id_cart}`;
        }
        
        //busco el producto segun id
        const productFound = await products.getById(id_prod);
        if (!productFound) {
            throw `No existe producto con id: ${id_prod}`;
        }

        //me fijo si el carrito tiene el producto
        let productIndex = cartFound.productos.findIndex(obj => (obj.id.toString()) === id_prod)
        
        if ( productIndex == -1 ){
            res.status(404).json({error: `No se encontró ningun producto con id: ${id_prod} en el carrito`})
            return
        }

        //lo elimino
        cartFound.productos.splice(productIndex,1)

        //actualizo el carrito
        await carts.updateById(id_cart, cartFound)

        res.status(200).json('Se quitó el producto del carrito');

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } 