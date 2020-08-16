const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash =require('connect-flash');
const expressValidator =require('connect-flash');
const dotenv = require('dotenv').config();
const passport = require('passport');
//db
const db = require('./config/db')();

//routes
const indexEnRouter = require('./routes/index_en');
const indexRuRouter = require('./routes/index_ru');
const usersRouter = require('./routes/users');
const admincollectionRouter = require('./routes/admin/collection');
const adminproductRouter = require('./routes/admin/product');
const collectionRouter = require('./routes/collection');

const app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
//express session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie:{maxAge:24*60*1000}
}));

//flash
app.use(flash())
app.use((req,res,next)=>{
  res.locals.messages = require('express-messages')(req,res);
  next();
});


//passport init
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//user global
app.get('*',(req,res,next)=>{
  res.locals.user = req.user || null;
  next();
})


app.use('/users', usersRouter);
app.use('/admin/collection', admincollectionRouter);
app.use('/admin/product', adminproductRouter);
app.use('/en', indexEnRouter);
app.use('/', indexRuRouter);
app.use('/collection', collectionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
