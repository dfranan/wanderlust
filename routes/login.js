var express = require('express');
var router = express.Router();
var bd = require('./bd');
var session = require('express-session');
var md5 = require('md5');

router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/',function(req,res,next){
    var usuario = req.body.usuario;
    var pass = md5(req.body.pass);

    var consulta = "select * from login where usuario = '"+usuario+"' and password = '"+pass+"';"

    bd.query(consulta,function(err,result){
        if(err){
            console.log(err);
        }else{
        if(result.length > 0){
            req.session.usuario = usuario;
            res.redirect('index');
        }else{
            res.render('login',{mensaje:"datos incorrectos"});
        };
    };
    
    });

});


module.exports = router;