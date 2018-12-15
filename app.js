const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const session = require('express-session')
const indexRouter = require('./routes/index')
const login = require('./routes/login')
const registro = require('./routes/registro')
const stories = require('./routes/stories')
const mail = require('./routes/mail')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'marcador12345',
    saveUninitialized: false,
    cookie: { maxAge: null },
  })
)

app.use('/', indexRouter)
app.use('/login', login)
app.use('/registro', registro)
app.use('/stories', stories)
app.use('/logout', (req, res) => {
  delete req.session.usuario
  res.redirect('/')
})
app.unsubscribe('/mail', mail)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
