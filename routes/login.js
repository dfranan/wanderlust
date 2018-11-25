var express = require('express');
var router = express.Router();
var bd = require('./bd');
var md5 = require('md5');


router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',(req,res)=>{
    let usuario = req.body.usuario;
    let password = md5(req.body.pass);

    console.log(usuario);
    console.log(password);

    let consulta = "SELECT * FROM LOGIN WHERE USUARIO = '"+usuario+"' AND PASSWORD = '"+password+"'";
    console.log(consulta);
    bd.query(consulta, (error, result)=>{
        console.log('que onda aca');
        if (error){
         
            console.log(error);
            
        }else{
    
        if(result.length > 0){
            console.log("Bienvenido");

            req.session.usuario = usuario; 
         
            console.log(req.session.usuario);
            res.redirect('index');
            } else  {
                console.log('holi');
                // usuario o contraseña incorrectos
                console.log(error);
                res.render('login',{mensaje:'Datos incorrectos'});
            }
        }
    });

});



module.exports = router;