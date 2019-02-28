const express       = require('express')
const app           = express()
const hbs           = require('hbs') 
const path          = require('path') 
const bodyParser    = require('body-parser');

const port          = 3000




// Package Middlewares
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Custom Middleware
app.use(myFakeMiddleware)

function myFakeMiddleware(req, res, next) {
  console.log("myFakeMiddleware was called AGAIN!!")
  req.premiumUser = true
  next()
}





// GET: QUERY STRING + URL PARAMS

// randeriza vista de formulario
app.get('/', (req, res, next) => res.render('index'))

// muestra resultados GET del formulario
app.get('/search', (req, res, next) => res.send(req.query))

// http://localhost:3000/users/1345
app.get('/users/:userid', (req, res) => res.send(req.params))

// http://localhost:3000/shop/chaqueta/negro
app.get('/shop/:article/:color', (req, res) => res.send(req.params))

// http://localhost:3000/products/1345?show=reviews
app.get('/details/:id', (req, res, next) => {
    console.log(`Método -> ${req.method}`)
    console.log(`Path -> ${req.path}`)
    console.log(`Id de los parámetros -> ${req.params.id}`)
    console.log(`Query string -> ${req.query.show}`)

    res.send("Mira la consola, merluzo")
})

app.get('/middlewares', (req, res, next) => {
    // Tras pasar por el middleware muestra el texto
    let greetings = ""
    if (req.premiumUser) greetings = "Gracias por tu subscripción!"
    res.send(`La cadena de Middlewares ha sido procesada en su totalidad (mira la consola) ${greetings}`);
});






// POST METHODS

// es posible tener una ruta idéntica para .get y .post
app.get('/user-register', (req, res) => res.render('user-info-form') )
app.post('/user-register', (req, res) => res.send(`Bienvenid@ ${req.body.name}`))




app.listen(3000, () => console.log(`App escuchando en puerto ${port}`)) 