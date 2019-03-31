var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
var session = require('express-session');
var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var db = require('./models'),db;
var models = require('./models');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

var app = express();

var sequelize = db.sequelize;

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  
} = process.env

app.use(session({
  name: SESS_NAME,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000000, 
    sameSite: true,
  },
  store: new SequelizeStore({
    db: sequelize
  }),
  proxy: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
})

// view engine setup
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
