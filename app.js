const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/USER');
const MongoStore = require('connect-mongodb-session')(session);

const app = express();

mongoose.connect('mongodb+srv://admin:admin@db.z3rzz.mongodb.net/?retryWrites=true&w=majority', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB is connected');
  }
});

const sessionStore = new MongoStore({
  uri: 'mongodb+srv://admin:admin@db.z3rzz.mongodb.net/?retryWrites=true&w=majority',
  collection: 'session',
});
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // one day
    },
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.redirect('/login');
  });
});
app.use(cors());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error_msg');
  next();
});

app.use('/static', express.static('public'));

app.set('view engine', 'ejs');

const RegRoute = require('./routes/auth');
app.use('/', RegRoute);

const LogRoute = require('./routes/login');
app.use('/', LogRoute);

const mainRoute = require('./routes/main');
app.use('/', mainRoute);

const admin_page = require('./routes/adminPage');
app.use('/', admin_page);

const myprofile = require('./routes/myprofile');
app.use('/myprofile', myprofile);

const games = require('./routes/games');
app.use('/', games);

app.listen(3000, () =>
  console.log('Listening on port 3000 http://localhost:3000')
);

