import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';
//import admin from 'firebase-admin';
//import config from '../../config.js';

//const db = admin.firestore();

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos');
    }
}

export default CarritoDaoFirebase;