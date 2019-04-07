var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");

web3 = new Web3("http://localhost:8545");

coinbase = "0x3d2cf517b33f2217d7822442ec8eaef1398684c6";
var contractAddress = "0x3562972a4e1de76179b7b7b0f75816926b92693e";
var contractAbi ;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/getTask');
 
todo = new web3.eth.Contract(contractAbi, contractAddress);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var newTaskRouter = require('./routes/newTask');
var getTaskRouter = require('./routes/getTask');
var setStatusRouter = require('./routes/setStatus');

app.use('/', indexRouter);
app.use('/newTask', newTaskRouter);
app.use('/getTask', getTaskRouter);
app.use('/set', setStatusRouter);


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
