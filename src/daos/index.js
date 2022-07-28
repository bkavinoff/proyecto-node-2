import dotenv from 'dotenv';
dotenv.config();

let ProductDao;
let CarritoDao;

switch (process.env.DATABASE) {
    case 'firebase':
        const { default: ProductDaoFirebase } = await import('./productos/productoDaoFirebase.js');
        const { default: CarritoDaoFirebase } = await import('./carritos/carritoDaoFirebase.js');

        ProductDao = new ProductDaoFirebase;
        CarritoDao = new CarritoDaoFirebase;

        break;
    
    case 'mongo':
        const { default: ProductDaoMongo } = await import('./productos/productoDaoMongo.js');
        const { default: CarritoDaoMongo } = await import('./carritos/carritoDaoMongo.js');
    
        ProductDao = new ProductDaoMongo;
        CarritoDao = new CarritoDaoMongo;
    
        break;

    default:
        console.log('db', process.env.DATABASE);
        break;
}

export { ProductDao, CarritoDao };