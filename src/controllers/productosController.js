//Esta funcion selecciona a todos los registros de la tabla de "product" (querie)
//redirige a la pagian de productos
//Muestra los datos en una tabla
function indexp(req, res) {
    req.getConnection((err, conn) => {
      //conn.query('SELECT * FROM product', (err, pers) => {
        conn.query('SELECT a.costo, a.unidad, a.id_producto, a.name, b.descripcion, a.precio FROM product a, articulo b WHERE a.tipo_art=b.tipo_art', (err, pers) => {
        if(err) {
          res.json(err);
        }
        console.log("--------",pers)
        res.render('pages/productos', { pers });
      });
    });
  }
  

//Redirige a la pagina para crear un nuevo producto
  function create(req, res) {
  
    res.render('pages/createprod');
  }
  
//Inserta la informacion del formulario en la tabla de "product" (querie)
  function store(req, res) {
    const data=req.body;
    
            req.getConnection((err,conn) => {
                conn.query('INSERT INTO product SET ?',[data], (err,rows) => {
                  res.redirect('/productos'); 
                });
            });
}
  
//Borra la informacion seleccionada de la base de datos
//Al ejecutar eso te redirige a la pagina de "/productos"
  function destroy(req, res) {
    const id_producto = req.body.id;
    
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM product WHERE id_producto = ?', [id_producto], (err, rows) => {
        res.redirect('/productos');
       });
   })
 
 }
  
 //Selecciona de la tabla "product" toda la informacion
 //Al ejecitarlo te redirige a la pagina para editar el producto
  function edit(req, res) {
    const id_producto = req.params.id;
    console.log(id_producto)

    req.getConnection((err, conn) => {
     conn.query('SELECT * FROM product WHERE id_producto = ?', [id_producto], (err, pers) => {
        if(err) {
          res.json(err);
        }
        res.render('pages/editprod', { pers });
      });
    });
  }

//Actualiza los datos de la tabla product en la base de datos (querie)
//Redirige a la pagina de "/productos"
  function update(req, res) {
    const id_producto = req.params.id;
    const data = req.body;
  
    req.getConnection((err, conn) => {
      conn.query('UPDATE product SET ? WHERE id_producto = ?', [data, id_producto], (err, rows) => {
        if(err) {
            res.json(err);
        }
        res.redirect('/productos');
      });
    });
  }
  
  
//exporta las funciones 
  module.exports = {
    indexp: indexp,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
  }