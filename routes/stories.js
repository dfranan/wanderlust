const express = require('express')
const router = express.Router()
const bd = require('./bd')

router.get('/new', (req, res, next) => {
  res.render('formularioPost')
})

router.get('/edit/:id', (req, res, next) => {
  const query =
    'SELECT id_post, lugar, titulo, post FROM posts JOIN login ON id = id_autor WHERE id_post = ' +
    req.params.id

  bd.query(query, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.render('formularioPost', result[0])
    }
  })
})

router.get('/:id', (req, res) => {
  const query =
    'SELECT id_post, lugar, usuario AS author, titulo, post, id_autor FROM posts JOIN login ON id = id_autor WHERE id_post = ' +
    req.params.id

  bd.query(query, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      const isFromCurrentUser = req.session.usuario
        ? Boolean(result[0].id_autor == req.session.usuario.id)
        : false

      res.render('storie', {
        data: {
          ...result[0],
          isFromCurrentUser,
        },
        usuario: req.session.usuario,
      })
    }
  })
})

router.post('/', (req, res, next) => {
  const { titulo, lugar, post } = req.body
  const id_usuario = req.session.usuario.id

  const query = `INSERT INTO posts (titulo, lugar, post, id_autor) values ('${titulo}','${lugar}','${post}', ${id_usuario})`

  bd.query(query, (error, resultado) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/:id', (req, res, next) => {
  const { titulo, lugar, post } = req.body

  const query = `UPDATE posts SET titulo = '${titulo}', lugar = '${lugar}', post = '${post}' WHERE id_post = ${
    req.params.id
  }`

  bd.query(query, (error, resultado) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect(`/stories/${req.params.id}`)
    }
  })
})

router.post('/eliminar/:id', (req, res, next) => {
  //req.session.usuario || res.end()

  const query = `DELETE FROM posts WHERE id_post = ${req.params.id}`
  bd.query(query, (error, resultado) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/#stories')
    }
  })
})

module.exports = router
