const db = require('../db');

var schema = db.Schema({
    p_name: { type: String, require: true, trim: true },
    p_desc: { type: String, require: true, trim: true },
    p_image: { type: String, require: true },
    obj_id: { type: String, require: true, trim: true },
    reviews: { type: Array }
});


// compilation of schema 
module.exports = db.model('productdata', schema, 'product')