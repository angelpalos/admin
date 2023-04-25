// Carga de librerias 
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Session } = require('express-session');


//Define que si hay un valor existente lo uso sino usa el ya definido
const PORT = process.env.PORT || 5000 ;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'sistema3';
const DB_PORT = process.env.DB_PORT || 3306 ;

console.log(DB_HOST,' ',DB_NAME,' ',DB_PASSWORD,' ',DB_PORT,' ',DB_USER);

//Definición de las rutas de acceso a procesos 
const loginRoutes = require('./routes/login');

// creacion de la aplicación y asignación del puerto 
const app = express();
app.set('port',PORT);
//definicion de la carpeta de plantillas (templates, views)
app.set('views', __dirname+'/views');
//Define al motor de vistas de Node.js para usar el "hbs" 
//este usa templetes para renderizar HTML.
app.engine('hbs', engine({
    extname: '.hbs',
}))
//el motor de plantillas se define como Handlebars
app.set('view engine', 'hbs');
//configura el middleware mediante el paquete body-parser para analizar los cuerpos 
//de las solicitudes HTTP entrantes, Para analizar las solicitudes entrantes 
//con cargas útiles codificadas en URL, que a menudo se usan al enviar datos de 
//formularios HTML.
app.use(bodyParser.urlencoded({
    extended: true
}));
//configura el middleware para analizar las solicitudes entrantes con cargas JSON.
app.use(bodyParser.json());
//define las credenciales de conección a la Base de datos 
app.use(myconnection(mysql,{
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
}));

//define los parametros para crear una sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true 
}));

//En este caso específico, el middleware que se configura es loginRoutes 
//y se monta en la ruta raíz ('/'). 
//Esto significa que cualquier solicitud a la aplicación pasará primero por el 
//middleware loginRoutes antes de pasar a cualquier middleware posterior.
app.use('/',loginRoutes);


//este es método Express.js configura una ruta para la aplicación. 
//Toma dos parámetros: el primer parámetro es la ruta de la ruta y 
//el segundo parámetro es una función de devolución de llamada 
//que se ejecuta cuando se realiza una solicitud a esa ruta.
app.get('/', (req,res) => {
    if (req.session.loggedin == true) {
        res.render('home',{name: req.session.name});        
    } else {
        res.redirect('/login');
    }
})

//inicia la ejecución de la aplicación en el puert 4000
app.listen (app.get('port'), () =>{
    console.log('listening on port ', app.get('port'));
})
