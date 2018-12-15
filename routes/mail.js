var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'wanderlust-master@outlook.com',
        pass: 'Wanderlust1234'
    }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.get('/', function(req, res, next) {
  res.render('/#contacto');
});

router.post('/', function(req, res, next){
  var name = req.body.nombreContacto;
  var email = req.body.emailContacto;
  var message = req.body.mensajeContacto;
  var content = 'Name: ${name} \n Email: ${email} \n Message: ${content}';

  var mail = {
    from: 'wanderlust-master@outlook.com',
    to: 'guss.995@hotmail.com',  
    subject: 'Contacto Wanderlust',
    text: req.body.content
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      });
    } else {
      res.json({
        msg: 'success'
      });
    }:
  });
});

module.exports = router;