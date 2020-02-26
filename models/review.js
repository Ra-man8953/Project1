const db = require('./db');
const mongoose = require('mongoose');
var schema = db.Schema({
    review_message: { type: String, require: true, trim: true },
    product_id: { type: String, require: true, trim: true },
    prod_name: { type: String, require: true, trim: true }
});


// compilation of schema 
module.exports = db.model('reviews', schema)