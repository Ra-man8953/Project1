var db = require('../models/review')
var db_product = require('../models/product')
var jwt = require('jsonwebtoken');
const conn = require('../config/config.json');

// Crete the Product Reviews by the product Id

exports.create_review = (req, res) => {
    var content = JSON.parse(req.body.toString())
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }

        db_product.find({ _id: req.params.p_id }, (err, docs) => {
            if (err) throw err;
            if (docs) {

                var obj = new db({
                    review_message: content.review_message,
                    product_id: req.params.p_id,
                    prod_name: docs[0].p_name
                })
                var obj1 = {
                    review_message: content.review_message,
                    product_id: req.params.p_id,
                    product_name: docs[0].p_name
                }
                obj.save((err, data) => {
                    if (!err) {
                        return res.json({
                            sucess: true,
                            message: "Review Added Succefully",
                            data: obj1,

                        })
                    } else {
                        return res.json({
                            sucess: false,
                            message: "Review Not Added Successfully",
                        })
                    }
                })
            } else {
                return res.json({
                    sucess: false,
                    message: "Product Not Found"
                })
            }
        })
    })


}

// Update the reviews according to product Id

exports.update_review = (req, res) => {
    var content = JSON.parse(req.body.toString())
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        db.findOneAndUpdate({ _id: req.params.id }, content, { new: true }, (err, doc) => {

            var datasss = {
                review_id: doc._id,
                description: doc.review_message,
                p_name: doc.prod_name,
                p_id: doc.product_id
            }
            if (doc === null) {

                return res.json({
                    sucess: false,
                    message: "Product Review or Review Id Not Exists"
                })
            } else {
                return res.json({
                    sucess: true,
                    message: "Review Updated Successfully",
                    data: datasss
                })

            }

        })
    })


}

// Delete the product reviews by the product Id

exports.delete_review = (req, res) => {

    db.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (doc.deletedCount === 0) {

            return res.json({
                sucess: false,
                message: "Product Review or Review Id Not Exists"
            })

        } else {
            return res.json({
                sucess: true,
                message: "Review Deleted Successfully",
                data: ""
            })
        }
    })
}

// Showing the revies of the particular product according to its product Id

exports.show_product_reviews = (req, res) => {

    var p_id = req.params.p_id
    db.find({ product_id: p_id }, (err, doc) => {
        // create the array object and push the data
        var dataa = []
        for (i = 0; i <= doc.length - 1; i++) {
            var datasss = {
                product_id: doc[i].product_id,
                product_name: doc[i].prod_name,
                review_id: doc[i]._id,
                review_message: doc[i].review_message
            }
            dataa.push(datasss)
        }
        if (datasss) {
            return res.json({
                sucess: true,
                message: "Product Review Are Displayed",
                data: dataa
            })
        } else {
            res.send('no review for this user product')
        }

    })

}