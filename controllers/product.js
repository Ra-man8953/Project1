// Require the product schema to add product details
var db_product = require('../models/product')

// require the config file that pass database url to the user
const conn = require('../config/config.json');

// require it to create TOKEN to perform sign and verify operation 
var jwt = require('jsonwebtoken')

// It methods are used to create the product according to user
exports.create_product = (req, res) => {

    var content = JSON.parse(req.body.toString())

    // verify teh token to the user headers authorization
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {

        // store the value of user data that are show on response
        var datass = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            // create an object and store the value into the schema
        var obj = new db_product({
                p_name: content.p_name,
                p_desc: content.p_desc,
                p_image: content.p_image,
                obj_id: data.id,
                reviews: content.reviews
            })
            // variable that can send through the response of the data
        var datab = {
                p_name: content.p_name,
                p_desc: content.p_desc,
                p_image: content.p_image,
                user: datass
            }
            // save the data into the product schema
        obj.save((err, data) => {
            if (!err) {
                res.json({
                    sucess: true,
                    message: "Product Add Successfully",
                    data: datab
                })
            } else { res.send(err) }
        })
    })

}




// delete the product according to its Id

exports.delete_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var p_id = req.params.id
            // here deleteone command are used to delete the product according to its product id
        db_product.deleteOne({ _id: p_id }, (err, doc) => {
            if (doc.deletedCount === 0) {

                return res.json({
                    sucess: false,
                    message: "Product Not Found"
                });

            } else {
                return res.json({
                    sucess: true,
                    message: "Product Deleted",
                    data: [""]
                })
            }
        })
    })

}



// update the product record according to product id

exports.update_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        var pro_id = req.params.id
        var content = JSON.parse(req.body.toString())
        db_product.findOneAndUpdate({ _id: pro_id }, content, { new: true }, (err, doc) => {
            var datab = {
                p_id: pro_id,
                p_name: doc.p_name,
                p_desc: doc.p_desc,
                p_image: doc.p_image,
                reviews: doc.reviews,
                user: datass
            }
            if (doc === null) {

                return res.json({
                    sucess: false,
                    message: "Product Id Not Matched"
                })

            } else {
                res.json({
                    success: true,
                    message: "Product Updated Successfully",
                    data: datab
                })

            }
        })
    });

}


// Show the product of the user

exports.show_user_products = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var id = req.params.id;
        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        db_product.find({ _id: id }, (err, data) => {

            var datab = {
                p_id: id,
                p_name: data[0].p_name,
                p_desc: data[0].p_desc,
                p_image: data[0].p_image,
                obj_id: data[0].obj_id,
                user: datass
            }
            if (data.length) {
                return res.json({
                    sucess: true,
                    message: "Products  are Displayed",
                    data: datab
                })
            } else {
                res.send('no product for uthis user id')
            }
        })
    })
}