var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catsRouter = require('./routes/category');
var postRouter = require('./routes/post');
var loginRouter = require('./routes/login')(passport);
var signupRouter = require('./routes/signup')(passport);
var signoutRouter = require('./routes/signout')(passport);


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({ secret: 'mySecretKey', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

mongoose.connect('mongodb://localhost/blog');

app.use(function (req, res, next) {
	if (req.isAuthenticated()===true) {
		res.locals.user=req.user;
	}
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', catsRouter);
app.use('/post', postRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;