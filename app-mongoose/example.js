const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/catsApp', { useNewUrlParser: true })

// Requerimos el modelo
const Cat = require('./models/Cat.js')


// Crear documentos
Cat.create({ name: 'garfield 2', color: "White", age: '8' })
  .then(cat => { console.log(`El gato ha sido guardado: ${cat}`) })
  .catch(err => { console.log('An error happened:', err) });




setTimeout(()=>{

    console.log('Todos los gatos:');

    // Encontrar documentos (parámetros: objeto obligatorio query, proyección, opciones)
    Cat.find({age: {$gt: 8}}, 'name')  
        .then(results => console.log(`Los nombres de los gatos mayores de 8 años son: ${results}`))
        .catch(err => console.log("An error happened:" + err));


    // Enumerar documentos (parámetros: objeto obligatorio query, proyección, opciones)
    Cat.count({age: 8})
        .then(count => { console.log(`Hay ${count} gatetes de 8 años`) })
        .catch(err => { console.log(err) })

}, 5000)



// Evento de conexión de Mongoose
mongoose.connection.on('connected', () => {  
    console.log('Mongoose está ahora conectado')
}); 