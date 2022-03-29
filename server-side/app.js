var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var ingredientRouter = require('./routes/ingredient');
var productRouter = require('./routes/product');
var basketRouter = require('./routes/basket');
var productdetailRouter = require('./routes/product_detail');
var mypageRouter = require('./routes/mypage');
var managementRouter = require('./routes/management');
var orderRouter = require('./routes/order');
var reviewRouter = require('./routes/review');
var testRouter = require('./routes/test');
var { sequelize } = require('./models');
const tokenRouter = require('./routes/token');

var app = express();

sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/ingredient', ingredientRouter);
app.use('/product', productRouter);
app.use('/basket', basketRouter);
app.use('/productDetail', productdetailRouter);
app.use('/mypage', mypageRouter);
app.use('/management', managementRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/test', testRouter);
app.use('/token', tokenRouter);
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
