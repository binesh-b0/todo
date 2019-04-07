var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");

web3 = new Web3("http://localhost:8545");

coinbase = "0xb0192478f39a1055688c7560a72a6e2c880c489f";
var contractAddress = "0xbfac86fb6f5e27edf499e4a6333426011a829c4a";
var contractAbi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "newTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "newTaskAdded",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTask",
		"outputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_status",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

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
