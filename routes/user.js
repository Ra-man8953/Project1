var services = require('../controllers/user')



// registered the users and its details

// Delete the user through user id
module.exports = (router) => {

    router.delete('/user/delete', function(req, res) {
        services.delete_user(req, res)

    })

    // update the user dewtails through user id

    router.put('/user/update', function(req, res) {
        services.update_user(req, res)
    })


    // Retrieve the user details through the database

    router.get('/users', function(req, res) {
        services.get_user(req, res)
    })

}