const db = require('./db');
const mongoose = require('mongoose');
var schema = db.Schema({
    f_name: { type: String, require: true, trim: true },
    l_name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true }
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
}



// compilation of schema 
module.exports = db.model('user', schema)