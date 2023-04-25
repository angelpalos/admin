//se crea una constante y se requiere 'Express'
const express = require('express');
//se crean las contantes para el login, personal y productos
//que obtienen las funciones de cada JS 
const LoginController = require('../controllers/LoginController');
const persController = require('../controllers/personalController');
const productosController = require('../controllers/productosController');

const router = express.Router();

//Define las rutas que tendran
router.get('/login', LoginController.index);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.post('/login', LoginController.auth);
router.get('/logout', LoginController.logout);
router.get('/personal', LoginController.personal);

router.get('/pers', persController.index);
router.get('/create', persController.create);
router.post('/create', persController.store);
router.post('/pers/delete', persController.destroy);
router.get('/pers/edit/:id', persController.edit);
router.post('/pers/edit/:id', persController.update);

router.get('/productos', productosController.indexp);
router.get('/createprod', productosController.create);
router.post('/createprod', productosController.store);
router.post('/productos/delete', productosController.destroy);
router.get('/productos/editprod/:id', productosController.edit);
router.post('/productos/editprod/:id', productosController.update);

//Exporta las rutas 
module.exports = router;
