// Add the middelware bodyparser thet add the user data
const bodyParser = require('body-parser');
const index = require('./routes/index');

module.exports = (app) => {

    app.use(bodyParser.text())

    app.use('/api', index);

    //invalid url
    app.all('*', (req, res) => {
        res.send("invalid url " + String(req.url));
    });

}