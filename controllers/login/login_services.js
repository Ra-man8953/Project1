var db = require('../../models/schemas/user_schema');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.log_in = (req, res, token) => {

    jwt.verify(token, 'sharedkey', function(err, decoded) {
        if (!err) {
            var content = JSON.parse(req.body.toString())
            db.findOne({ email: content.email }, function(err, docs) {
                if (docs === null) {
                    res.send('wrong email')
                } else {
                    if (!bcrypt.compareSync(content.password, docs.password)) {
                        res.send('Wrong Password')
                        console.log(!bcrypt.compareSync(content.password, docs.password))
                    } else {
                        res.send('Successful Login')
                    }
                }
            })
        } else {
            res.send('unauthorized access');
        }
    })
}