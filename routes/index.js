var express = require('express'),
    router = express.Router();

router.use('/user', require('./userRoute'));

router.get('/', function (req, res) {
    //some code
})

module.exports = router