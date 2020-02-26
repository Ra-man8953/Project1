var services = require('../controllers/reviews')


// Create the Reviews bu product Id
module.exports = (router) => {

    router.post('/reviews/:p_id', (req, res) => {
        services.create_review(req, res);
    })

    // Show the product reviews

    router.get('/reviews/:p_id', (req, res) => {
        services.show_product_reviews(req, res);
    })

    // Delete the reviews by the product Id

    router.delete('/reviews/:id', (req, res) => {
        services.delete_review(req, res);
    })

    // Update the reviews by the product Id

    router.put('/reviews/update/:id', (req, res) => {
        services.update_review(req, res);
    })
}