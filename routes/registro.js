var express = require('express')
var router = express.Router()
var bd = require('./bd')
var md5 = require('md5')

router.get('/', (req, res) => {
  res.render('registro')
})

router.post('/', (req, res) => {
  const { nombre, apellido, usuario } = req.body
  const password = md5(req.body.pass)

  console.log('todo bien')
  var query = `INSERT INTO login 
                    (nombre,apellido,usuario, password) 
                VALUES 
                    ('${nombre}' ,'${apellido}','${usuario}','${password}')`

  console.log(query)
  bd.query(query, (error, resultado) => {
    if (error) {
      console.log(error)
    }
    console.log(resultado)
    res.render('login')
  })
})
module.exports = router
