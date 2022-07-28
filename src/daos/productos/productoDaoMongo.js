import ContenedorMongo from '../../contenedores/ContenedorMongo.js';

class ProductoDaoMongo extends ContenedorMongo {
    constructor() {
        super('productos', {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            stock: { type: Number, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            timestamp: { type: String, required: true },
        });
    }
}

export default ProductoDaoMongo;