var express = require('express');
var router = express.Router();
var bd = require('./bd');
var session = require('express-session');

router.get('/',(req,res,next)=>{
    res.render('formularioPost');
})


router.post('/nuevo',(req,res,next)=>{
    var publi = req.body.textoPost;
    var titulo = req.body.tituloPost;
    var lugar = req.body.lugarPost;
    
    agregar = "insert into posts (titulo, lugar, post) values ('"+titulo+"','"+lugar+"','"+publi+"')";
    bd.query(agregar,(error,resultado)=>{
        if (error){
            console.log(error)
        }else{
            res.redirect('index', {agregadoNuevo: 'Historia subida correctamente'});
        }
    })
})

router.post('/eliminar',(req,res,next)=>{

})

router.post('/editar',(req,res,next)=>{

})
module.exports = router;