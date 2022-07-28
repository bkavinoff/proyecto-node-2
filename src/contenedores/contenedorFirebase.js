import admin from 'firebase-admin';
import config from '../config.js';

//conecto a la db
admin.initializeApp ({
    credential: admin.credential.cert(config.firebase),
})
const db = admin.firestore();

class ContenedorFirebase {
    constructor(nombreColeccion) {
      this.coleccion = db.collection(nombreColeccion);
    }

    async getAll() {
      try {

        //busco los documentos de la colección
        const collection = await this.coleccion;
        const snapshotDocs = await collection.get();

        let productos = [];

        //cargo el array de productos
        snapshotDocs.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          
          productos.push({...data, id});
        })

        //devuelvo
        return productos;
      } catch (error) {
        console.log('Error en método getAll: ', error);
        return [];
      }
    }
  
    async getById(id) {
      try {
        //busco el documento segun ID
        const doc = await this.coleccion.doc(id).get();

        //obtengo su contenido:
        const data = doc.data();

        //verifico que haya contenido y lo devuelvo si no hay retorno null
        if (data) {
          return { ...data, id };
        } else {
          return null;
        }
       
      } catch (err) {
        console.log('Error en método getById: ', err);
      }
    }
   
    async save(object) {
      try {
        //le agrego el timestamp al objeto
        object.timestamp = new Date(Date.now());

        //lo guardo
        let resultado = await this.coleccion.add(object);

        //devuelvo el id
        return resultado.id;

      } catch(err) {
        console.log('Error en método save: ', err);
      }
    }
  
    async deleteById(id) {
      try {
          //como ya se validó antes que si existía, directamente lo elimino
          await this.coleccion.doc(id).delete();

      } catch (err) {
          console.log('Error en método deleteById: ', err);
      }
  }

  async updateById(id, object) {
      try {
        //seteo un nuevo timestamp
        object.timestamp = new Date(Date.now());

        //como ya se validó antes que si existía, directamente lo elimino
        await this.coleccion.doc(id).update(object);

      } catch (err) {
          console.log('Error en método updateById: ', err);
      }
  }
}
  
  export default ContenedorFirebase;