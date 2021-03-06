var db = require('../../models/schemas/user_schema');
const conn = require('../../config/config.json');
var key = conn[1].key
var jwt = require('jsonwebtoken');
var userSchema = require('../../models/schemas/user_schema');
var bcrypt = require('bcryptjs');


exports.log_in = (req, res, token) => {
    jwt.verify(token, key, function(err, decoded) {
        if (!err) {
            var content = JSON.parse(req.body.toString())
            db.findOne({ email: content.email }, function(err, docs) {
                if (docs === null) {
                    return res.status(403).json({ error: 'No credentials sent!' });
                } else {
                    if (!bcrypt.compareSync(content.password, docs.password)) {
                        return res.status(403).json({ error: 'No credentials sent!' });
                        console.log(!bcrypt.compareSync(content.password, docs.password))
                    } else {
                        res.json({
                            sucess: true,
                            message: "Successfull Login",
                            data: content

                        })
                    }
                }
            })
        } else {
            res.json({
                sucess: false,
                message: "Unauthorized User",
            })
        }

    })
}

exports.tokeninn = (req, res) => {

    var content = JSON.parse((req.body).toString())
    userSchema.findOne({ email: content.email }, (err, data) => {

        if (!data) {
            res.json({
                sucess: false,
                message: "Incorrect login"
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
    })
}