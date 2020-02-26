const auth = require('../controllers/auth')
const express = require('express')
const router = express.Router();

router
    .route('/auth/register')
    .post(auth.register)


router
    .route('/auth/login')
    .post(auth.tokeninn)


//    create a middleware to check the router authenticate or not

const checkAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
};
router.use(checkAuth)

require('./user')(router);


require('./product')(router);


require('./review')(router);

module.exports = router