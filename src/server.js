//DOTENV para acceder al process.env.PORT
import dotenv from "dotenv";
dotenv.config();

//Server
import express from 'express';
const app = express();

const puerto = process.env.PORT // || 8080;

//para poder acceder al req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Path
//import path from 'path';
//import { fileURLToPath } from 'url';
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);



import routes from './routes/index.js';



//app.use('/', express.static(path.join(__dirname + '../public')));
app.use('/', express.static('public'))

// API
app.use('/api', routes);

app.use('/*', (req, res) => {
    res.status(404).send({ error: -2, descripcion: `Ruta ${req.url} y método ${req.method} no implementada`});
});

//middleware de error:
app.use((error, req, res, next)=>{    
    console.log(error.statusMessage)
    res.status(error.statusCode).send(error.message)
    //res.error(error)
})

//server
app.listen(puerto, (error) => {
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${puerto}`);
    } else {
        console.log(`Error al iniciar el servidor en el puerto ${puerto}. Error ${error}`);
    }
})