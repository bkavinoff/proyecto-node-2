import mongoose from "mongoose";
import config from '../config.js';

//conecto a la db
await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async getAll() {
    try {

      //busco los documentos de la colección
      const docs = await this.coleccion.find({}, { __v: 0 }); //en el find({campos incluidos}, {campos excluidos})

      //los devuelvo
      return docs;

    } catch (error) {
      console.log('Error en método getAll: ', error);
      return [];
    }
  }

  async getById(id) {
    try {
      //el documento segun id de la colección
      const objeto = await this.coleccion.findById(id, { __v: 0 });

      //lo devuelvo
      return objeto;
     
    } catch (err) {
      console.log('Error en método getById: ', err);
    }
  }
 
  async save(object) {
    try {
      //le agrego el timestamp al objeto
      object.timestamp = new Date(Date.now());

      //lo guardo
      const newObject = new this.coleccion(object);
      let resultado = await newObject.save();

      //retorno el id
      return resultado.id;

    } catch(err) {
      console.log('Error en método save: ', err);
    }
  }

  async deleteById(id) {
    try {
      //lo busco y elimino
      await this.coleccion.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          throw 'findByIdAndDeleteError';
      }}).clone();
    } catch (err) {
        console.log('Error en método deleteById: ', err);
    }
}

  async updateById(id, obj) {
      try {

        //le guardo el id:
        obj._id = id
        //le agrego el timestamp al objeto
        obj.timestamp = new Date().toLocaleString('en-GB')
        

        const objetoModel = new this.coleccion(obj)
        objetoModel.isNew = false;

        await objetoModel.save();
      } catch (err) {
          console.log('Error en método updateById: ', err);
      }
  }
}

export default ContenedorMongo;