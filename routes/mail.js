var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: 'wanderlust.cntct@outlook.com',
    pass: 'wanderlust1234',
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

router.get('/', function(req, res, next) {
  res.render('/#contacto')
})

router.post('/', function(req, res, next) {
  const { nombre, email, mensaje } = req.body
  const content = `Name: ${nombre} \n Email: ${email} \n Message: ${mensaje}`

  const mail = {
    from: 'wanderlust.cntct@outlook.com',
    to: 'wanderlust.cntct@outlook.com',
    subject: 'Contacto Wanderlust',
    text: content,
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Mail successfully sended')
    }
    res.redirect('back')
  })
})

module.exports = router
