const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


// Modelo con validación de datos y conversión de 'name'
const catSchema = new Schema({
  name : {
    type: String, 
    default: 'Sin nombre',
    set: mayuscula
  },
  color: String,
  age  : Number
});


// Función conversora: devuelve el texto capitalizado
function mayuscula(val){
  return val.charAt(0).toUpperCase() + val.substring(1);
}


// Crear modelo pasando a .model() el nombre del modelo y el esquema
const Cat = mongoose.model('Cat', catSchema);


// Exportar el modelo para requerirlo en otros módulos
module.exports = Cat;