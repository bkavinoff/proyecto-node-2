import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class ProductoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos');
    }
}

export default ProductoDaoFirebase;