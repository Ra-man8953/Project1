const bcrypt = require('bcrypt')
var db = require('../../models/schemas/user_schema')
var db_product = require('../../models/schemas/product_schema')

exports.register = (req, res) => {

    // content that help to convert the body data into the string

    var content = JSON.parse(req.body.toString())

    // Validate if the user are registered than the message are show user registered otherwise create the users

    db_product.find({ email: content.email }, function(err, docs) {
        if (docs.length) {
            var obj = new db({
                f_name: content.f_name,
                l_name: content.l_name,
                email: content.email,
                password: bcrypt.hashSync(content.password, 10),
                products: docs
            })
            obj.save((err, data) => {
                if (!err) { res.send(obj) } else { res.send(err) }
            })
        } else {
            var obj = new db({
                f_name: content.f_name,
                l_name: content.l_name,
                email: content.email,
                password: bcrypt.hashSync(content.password, 10),
                products: []
            })
            obj.save((err, data) => {
                if (!err) { res.send(data) } else { res.send(err) }
            })
        }
    })

}




// Delete the user by the user ID

exports.delete_user = (req, res) => {

    var u_id = req.params.u_id;

    db.deleteOne({ _id: u_id }, function(err, doc) {
        if (doc.deletedCount === 0) {

            res.send("user not exist");

        } else {
            res.send("user deleted");

        }

    })
}


// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {

    var u_id = req.params.u_id;
    var content = JSON.parse(req.body.toString())
    db.findOneAndUpdate({ _id: u_id }, content, { new: true }, function(err, doc) {
        if (doc === null) {

            res.send("user not exist");

        } else {
            res.send("user updated");

        }
    });

}




// Get the user through the id

exports.get_user = (req, res) => {

    var u_id = req.params.u_id;
    db.findOne({ _id: u_id }, function(err, data) {
        if (data === null) {

            res.send("user not exist");

        } else {
            res.send(data);

        }
    });

}