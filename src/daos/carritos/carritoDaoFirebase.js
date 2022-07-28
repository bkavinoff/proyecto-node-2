import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';
//import admin from 'firebase-admin';
//import config from '../../config.js';

//const db = admin.firestore();

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos');
    }

    // async addProduct(cart, object) {
    //     // Agrega un producto al carrito.
    //     try {
    //         // await this.coleccion.doc(cart.id).update({ productos: admin.firestore.FieldValue.arrayUnion(object)});
    //         cart.productos.push(object);
    //         await this.coleccion.doc(cart.id).update({ productos: cart.productos });

    //     } catch(err) {
    //         console.log('Error en método addProduct: ', err);
    //     }
    // }

    // async removeProduct(cart, object) {
    //     // Remueve un producto del carrito.
    //     const productos = cart.productos.filter(producto => producto.id != object.id);
    //     await this.coleccion.doc(cart.id).update({ productos: productos });
    // }
    
    // async getProductById(cart, id_product) {
    //     // Recibe un id y devuelve el objeto con ese id, o null si no está.
    //     try {
    //         const object = cart.productos.find(object => object.id === id_product);
    //         return object ? object : null;
    //     } catch (err) {
    //         console.log('Error en método getProductById: ', err);
    //     }
    // }
}

export default CarritoDaoFirebase;