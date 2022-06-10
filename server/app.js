var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session")
var MysqlStore = require("express-mysql-session")(session)
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'board'
};
var sessionStore = new MysqlStore(options)

const { Sequelize } = require('sequelize');
global.sequelize = new Sequelize('board', 'root', 'root', {
  host: 'localhost',
  dialect: "mysql",
  logging: false //logs를 정리해줌
});

require("./model.js")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board')

var app = express();

app.use(session({
  key: 'session_key',
  secret: 'dkanrjsk', //아무거나 라는 뜻 하지만 이 값을 한번 사용하면 그 이후에 절대 바꾸면 앙댐
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

console.log(path.join(__dirname, "test")) //내 디렉토리가 어디에 있는지, "찾고 싶은 디렉토리 명 넣으면 더 상세하게 알려줌"
console.log(__filename) //내 파일이 어디있는지 log로 보여줌


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/board', boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;