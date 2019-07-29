
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var db = require('./models'),db;
var models = require('./models');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var cors = require('cors');

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

var whitelist = ['http://localhost:3001', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log('Database Connected');
});

module.exports = app;

