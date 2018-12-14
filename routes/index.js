const express = require('express')
const router = express.Router()
var bd = require('./bd')

router.get('/', function(req, res, next) {
  bd.query('SELECT id_post, lugar, SUBSTRING(`post`, 1, 80) AS post FROM posts', function(
    err,
    result
  ) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { stories: result, usuario: req.session.usuario })
    }
  })
})

module.exports = router
