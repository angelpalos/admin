//se crea una constante que requiere y llama a 'bcrypt' que encripta informacion
const bcrypt = require('bcrypt');


//Esta funcion selecciona a todos los registros de la tabla de "Users"
//redirige a la pagian de personal
//Muestra los datos en una tabla
function index(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM users', (err, pers) => {
        if(err) {
          res.json(err);
        }
        console.log("--------",pers)
        res.render('pages/personal', { pers });
      });
    });
  }
  
//Redirige a la pagina para crear un nuevo usuario
  function create(req, res) {
  
    res.render('pages/create');
  }
  
//La fuincion tiene el trabajo de verificar si el usuario (email) se repite (Con el querie) entra a una condicion
//Que si es asi mandara un error al Usuario que dira 'El usuario ya existe'
//Si no es asi, la password se encriptara con la costante de 'bcrypt'
//Y toda la informacion del formulario se insertara a la base de datos (con el querie) 
  function store(req, res) {
    const data=req.body;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM users WHERE email= ?',[data.email], (err,userData) => {
        if (userData.length>0){
          res.render('pages/create', {error: 'El usuario ya existe!'});
        } else {
          bcrypt.hash(data.password, 12).then(hash => {
            console.log(hash);
            data.password=hash;
            //console.log(data);
            req.getConnection((err,conn) => {
                conn.query('INSERT INTO users SET ?',[data], (err,rows) => {
                  res.redirect('/pers'); 
                });
            });
        
          });
        }
      });
    });
}
  

//Borra la informacion seleccionada de la base de datos
//Al ejecutar eso te redirige a la pagina de "/pers"
  function destroy(req, res) {
    const id_usuario = req.body.id;
    
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM users WHERE id_usuario = ?', [id_usuario], (err, rows) => {
        res.redirect('/pers');
       });
   })
 
 }
  

 //Selecciona de la tabla "Users" toda la informacion
 //Al ejecitarlo te redirige a la pagina para editar al usuario
  function edit(req, res) {
    const id_usuario = req.params.id;

    req.getConnection((err, conn) => {
     conn.query('SELECT * FROM users WHERE id_usuario = ?', [id_usuario], (err, pers) => {
        if(err) {
          res.json(err);
        }
        res.render('pages/edit', { pers });
      });
    });
  }
  

//Actualiza los datos de la tabla user en la base de datos (querie)
//vuelve a encriptar la contraseña con el "bcrypt"
//Redirige a la pagina de "/pers"
  function update(req, res) {
    const id_usuario = req.params.id;
    const data = req.body;

    bcrypt.hash(data.password, 12).then(hash => {
      console.log(hash);
      data.password=hash;
  
    req.getConnection((err, conn) => {
      conn.query('UPDATE users SET ? WHERE id_usuario = ?', [data, id_usuario], (err, rows) => {
        if(err) {
            res.json(err);
        }
        res.redirect('/pers');
      });
    });
   });
  }
  
  
//exporta las funciones 
  module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
  }