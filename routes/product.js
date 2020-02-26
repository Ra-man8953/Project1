var services = require('../controllers/product')

module.exports = (router) => {

    router.post('/products', (req, res) => {
        services.create_product(req, res);
    })


    router.put('/products/update/:id', (req, res) => {
        services.update_product(req, res);
    })

    router.delete('/products/:id', (req, res) => {
        services.delete_product(req, res);
    })


    router.get('/products/:id', (req, res) => {
        services.show_user_products(req, res);
    })

}