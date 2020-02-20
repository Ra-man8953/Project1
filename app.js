var express = require('express');
var app = express();
var db = require('./db');


var UserController = require('./controllers/user');
app.use('/api/users', UserController);

var productController = require('./controllers/product');
app.use('/api/products', productController);

module.exports = app;