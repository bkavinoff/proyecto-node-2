import { ProductDao as products } from '../daos/index.js';

const getProducts = async (req, res) => {
    try {
        //obtengo los productos
        const productList = await products.getAll();

        res.json(productList);
    } catch (err) { 
        res.status(500).json({ error: err });
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        //busco el producto segun id
        const product = await products.getById(id);

        if (!product) {
            throw `No existe producto con id: ${id}`;
        }

        //devuelvo
        res.status(200).json(product);

    } catch (err) { 
        res.status(500).json({ error: err });
    }
}

const saveProduct = async (req, res) => {
    try {
        const { name, thumbnail, price, description, code, stock } = req.body;
        
        //genero un producto con los datos recibidos
        const newProduct = { name: name, thumbnail: thumbnail, price: Number(price), description: description, code: code, stock: Number(stock) };

        //guardo el producto nuevo
        const id = await products.save(newProduct);
        res.status(201).json(id);
    } catch (err) { 
        res.status(500).json({ error: err });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, thumbnail, price, description, code, stock } = req.body;
        const id = req.params.id;

        //busco el producto segun id
        const product = await products.getById(id);

        if (!product) {
            throw `No existe producto con id: ${id}`;
        }

        //genero un producto con los nuevos datos
        const updatedProduct = { name: name, thumbnail: thumbnail, price: Number(price), description: description, code: code, stock: Number(stock) };

        //lo actualizo
        await products.updateById(id, updatedProduct);

        res.status(200).json('Producto modificado');

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Elimina un producto según su id
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        //busco el producto segun id
        const product = await products.getById(id);

        if (!product) {
            throw `No existe producto con id: ${id}`;
        }
        
        //lo elimino
        await products.deleteById(id);
        res.status(200).json('Producto eliminado');

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }