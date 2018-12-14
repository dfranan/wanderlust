var mysql = require('mysql')

var coneccion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
})

coneccion.connect(error => {
  if (error) {
    console.log(error)
  } else {
    console.log('conectado')
  }
})

module.exports = coneccion
