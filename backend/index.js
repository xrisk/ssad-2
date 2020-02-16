const mongoose = require('mongoose');
const models = require('./models.js');
const express = require('express');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', entry);
const app = express();

app.use(express.static('public'));
app.use(
  session({
    secret: 'cats',
    store: new MongoStore({mongooseConnection: db}),
    saveUninitialized: false,
    resave: false,
  }),
);
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/ssad', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const vendorStrategy = new LocalStrategy(models.Vendor.authenticate);
const customerStrategy = new LocalStrategy(models.Customer.authenticate);

passport.use('vendorLocal', vendorStrategy);
passport.use('customerLocal', customerStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (user != null) done(null, user);
});

app.use('/api', function(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', routes);

const port = 4040;
function entry() {
  console.log('connected!');
  app.listen(port, () => console.log(`Started web server on port ${port}`));
}
