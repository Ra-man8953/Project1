const bcrypt = require('bcrypt')
const conn = require('../../config/config.json');
var db = require('../../models/schemas/user_schema')
var db_product = require('../../models/schemas/product_schema')
var jwt = require('jsonwebtoken')


exports.register = (req, res) => {

    // content that help to convert the body data into the string

    var content = JSON.parse(req.body.toString())
    var datas = {
        f_name: content.f_name,
        l_name: content.l_name,
        email: content.email
    };


    // Validate if the user are registered than the message are show user registered otherwise create the users

    db_product.find({ email: content.email }, function(err, docs, data) {
        if (docs.length) {
            var obj = new db({
                f_name: content.f_name,
                l_name: content.l_name,
                email: content.email,
                password: bcrypt.hashSync(content.password, 10),

            })

            obj.save((err, data) => {
                if (!err) {
                    res.json({
                        sucess: true,
                        message: "User Add Successfully",
                        data: datas
                    })
                } else res.json({
                    sucess: false,
                    message: "User Not Added",

                })
            })
        } else {
            var obj = new db({
                f_name: content.f_name,
                l_name: content.l_name,
                email: content.email,
                password: bcrypt.hashSync(content.password, 10),

            })
            obj.save((err, data) => {
                if (!err) {
                    res.json({
                        sucess: true,
                        message: "User Add Successfully",
                        data: datas
                    })
                } else {
                    res.json({
                        sucess: false,
                        message: "User not Added"
                    })
                }
            })
        }
    })

}




// Delete the user by the user ID

exports.delete_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        db.deleteOne({ email: data.email }, function(err, doc) {

            if (doc.deletedCount === 0) {

                res.json({
                    sucess: false,
                    message: "User Not Found",
                    data: doc,
                })

            } else {
                res.json({
                    sucess: true,
                    message: "User Deleted successfull",
                    data: [""]
                })
            }
        })
    })

}


// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        var content = JSON.parse(req.body.toString())
        db.findOneAndUpdate({ db_email: data.email }, content, { new: true }, function(err, doc) {
            var obj = new db({
                f_name: doc.firstName,
                l_name: doc.lastName,
                email: doc.email,
                password: bcrypt.hashSync(doc.password, 10)
            })
            obj.save((err, data) => {

            })
            var databa = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            if (doc === null) {

                return res.json({
                    sucess: false,
                    message: "User not Exist"
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "User Updated Successfully",
                    data: databa
                })

            }
        });

    })


}




// Get the user through the id

exports.get_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {

        var datab = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        db.findOne({ email: data.email }, function(err, data) {

            if (data === null) {

                return res.json({
                    sucess: false,
                    message: "User Not Exist",
                    data: [""]
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "Users Get Successfully ",
                    data: datab
                })

            }
        });
    })



}