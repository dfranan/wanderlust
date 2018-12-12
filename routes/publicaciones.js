var express = requiere('express');
var router = express.Router();
var bd = require('./bd');
var session = require('express-session');

router.get('/',(req,res,next)=>{
    res.render('publicaciones');
})


router.post('/nuevo',(req,res,next)=>{
    var publi = req.body.post;
    var titulo = req.body.titulo;
    var lugar = req.body.lugar;
    
    var consulta = 
})

router.post('/eliminar',(req,res,next)=>{

})

router.post('/editar',(req,res,next)=>{

})
module.exports = router;