var express = require('express');
var router = express.Router();
var bd = require('./bd');
var md5 = require('md5');

router.get('/',(req,res)=>{
    res.render('registro');
})

router.post('/',(req,res)=>{
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        password: md5(req.body.pass)
    };
    console.log('todo bien');
    var query = "insert into login (nombre,apellido,usuario, password) values ('"+data.nombre+"' ,'"+data.apellido+"','"+data.usuario+"','"+data.password+"')";
    console.log(query);
    bd.query(query, (error,resultado)=>{
        if (error){
            console.log(error);
        }
        res.render('login');
    });

})
module.exports = router;