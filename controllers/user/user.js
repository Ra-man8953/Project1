var express = require('express');
var services = require('./user_services')
var router = express.Router();


// registered the users and its details

router.post('/', function(req, res) {
    services.register(req, res)
})

// Delete the user through user id

router.get('/delete/:u_id', function(req, res) {
    services.delete_user(req, res)
})

// update the user dewtails through user id

router.post('/update/:u_id', function(req, res) {
    services.update_user(req, res)
})


// Retrieve the user details through the database

router.get('/:u_id', function(req, res) {
    services.get_user(req, res)
})

module.exports = router;