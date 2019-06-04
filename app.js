var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

// var indexRouter = require('./routes/index');
const config = require('./config.json');
const usersRouter = require("./api/user/index");
const loginRouter = require("./api/auth/index");
const prescriptRouter = require("./api/prescription/index");
const productRouter = require("./api/product/index");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const corsOptions = {
  origin: true
}

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureCookie,
      maxAge: 12 * 60 * 60 * 1000
    }
  })
)

// app.use('/', indexRouter);

// catch 404 and forward to error handler


// error handler

mongoose.connect(config.MONGO_DB, { useNewUrlParser: true }, err => {
  if (err) console.log(err);
  else {
    console.log("Successful to connect mongodb");
    app.use("/api/v1/prescription", prescriptRouter);
    app.use("/api/v1/product", productRouter);
    app.use("/api/v1/user", usersRouter);
    app.use("/api/v1/auth", loginRouter);
    app.use(function (req, res, next) {
      next(createError(404));
    });
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    const port = process.env.PORT || 3000;
    app.listen(port, err => {
      if (err) console.log(err);
      else console.log("Successful to connect on port: " + port);
    })
  }
})
