const db = require('./db');
const mongoose = require('mongoose');
var schema = db.Schema({
    f_name: { type: String, require: true, trim: true },
    l_name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true }
});


// compilation of schema 
module.exports = db.model('userdata', schema, 'user')