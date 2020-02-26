// Require the user Schema into the services
var db = require('../models/user');
var db_product = require('../models/product')

// Require the config file that have mongodb url
const conn = require('../config/config.json');
// That are used to get the value of string data
var key = conn[1].key

// Require to generate TOKEN for user
var jwt = require('jsonwebtoken');

// Require to decrypt and Encrypt the file
var bcrypt = require('bcryptjs');

// That method are used to generate a token of the user register data and validate the user
exports.tokeninn = (req, res) => {

    var content = JSON.parse((req.body).toString())
        // jwt.verify({ db_password: content.password })
    db.findOne({ email: content.email }, (err, data) => {

        if (!data) {
            res.json({
                sucess: false,
                message: "Incorrect login"
            })
        } else {
            if (!bcrypt.compareSync(content.password, data.password)) {
                res.json({
                    sucess: false,
                    message: "Invalid Credentials"
                })
            } else {
                var token = jwt.sign({
                    id: data._id,
                    firstName: data.f_name,
                    lastName: data.l_name,
                    email: data.email,
                }, conn[1].key, { expiresIn: 600 * 600 });

                res.json({
                    sucess: true,
                    message: "Token Generated successfully",
                    token: token

                })
            }


        }
    })
}

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