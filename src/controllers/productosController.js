//Esta funcion selecciona a todos los registros de la tabla de "product" (querie)
//redirige a la pagian de productos
//Muestra los datos en una tabla
function indexp(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT a.costo, a.unidad, a.id_producto, a.name, b.descripcion, a.precio, c.description FROM product a, articulo b, units c WHERE a.tipo_art=b.tipo_art and a.unidad=c.unidad ORDER BY `name` ASC', (err, pers) => {
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
    req.getConnection((err, conn)=>{
      conn.query('SELECT * FROM articulo', (err, pers)=>{
        req.getConnection((err, conn)=>{
          conn.query('SELECT * FROM units', (err, per)=>{
            res.render('pages/createprod', { pers, per})
        })
      });
    });
  });
} 
//Inserta la informacion del formulario en la tabla de "product" (querie)
  function store(req, res) {
    const data=req.body;
    
            req.getConnection((err,conn) => {
                conn.query('INSERT INTO product SET ?',[data], (err,rows) => {
                  if(err) throw err;
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

    req.getConnection((err, conn) => {
     conn.query('SELECT a.id_producto,a.tipo_art,a.name,a.precio,a.costo,a.unidad,b.descripcion, c.description FROM product a, articulo b, units c where a.id_producto=? and b.tipo_art = a.tipo_art and a.unidad=c.unidad', [id_producto], (err, pers) => {
        if(err) {
          console.log(err);
        

        
        }
        req.getConnection((err, conn)=>{
          conn.query('SELECT * FROM articulo', (err, art)=>{
            req.getConnection((err, conn)=>{
              conn.query('SELECT * FROM units', (err, uni)=>{
                console.log(art)
                res.render('pages/editprod', { pers, art, uni})
              })
            })
          
          });
        });
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
        if(err) throw err
        res.redirect('/productos');
      });
    });
  }

  function buscar(req, res){
    const data = req.body;
    const busc =  data.buscador + '%'
    console.log(busc)
    req.getConnection((err, conn)=>{
      conn.query("SELECT a.costo, a.unidad, a.id_producto, a.name, b.descripcion, a.precio, c.description FROM product a, articulo b, units c WHERE a.tipo_art=b.tipo_art and a.unidad=c.unidad and a.name LIKE ? ORDER BY `name` ASC ", [busc], (err, pers) => {
        console.log(data.buscador)
        console.log(err)
        console.log(pers)
        res.render('pages/productos', {pers})
        
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
    buscar,
  }