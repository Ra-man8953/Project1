var db_product = require('../../models/schemas/product_schema')
var db = require('../../models/schemas/user_schema')
var db_review = require('../../models/schemas/review_schema')
const conn = require('../../config/config.json');
var jwt = require('jsonwebtoken')


exports.create_product = (req, res) => {


    var content = JSON.parse(req.body.toString())

    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {

        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        var obj = new db_product({
            p_name: content.p_name,
            p_desc: content.p_desc,
            p_image: content.p_image,
            obj_id: data.id,
            reviews: []
        })
        var datab = {
            p_name: content.p_name,
            p_desc: content.p_desc,
            p_image: content.p_image,
            user: datass
        }

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






exports.delete_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var p_id = req.params.id

        db_product.deleteOne({ _id: p_id }, function(err, doc) {
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





exports.update_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        var pro_id = req.params.id
        var content = JSON.parse(req.body.toString())
        db_product.findOneAndUpdate({ _id: pro_id }, content, { new: true }, function(err, doc) {
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
        db_product.find({ _id: id }, function(err, data) {

            var datab = {
                p_id: id,
                p_name: data[0].p_name,
                p_desc: data[0].p_desc,
                p_image: data[0].p_image,
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