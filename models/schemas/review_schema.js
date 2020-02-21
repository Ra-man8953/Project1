const db = require('../db');
var schema = db.Schema({
    review_id: { type: String, require: true, trim: true },
    review_message: { type: String, require: true, trim: true },
    product_id: { type: String, require: true, trim: true }
});


// compilation of schema 
module.exports = db.model('reviewdata', schema, 'review')