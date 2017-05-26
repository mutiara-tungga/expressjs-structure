var express = require('express')
    , router = express.Router();

router.use('/users', require('./userController'))

router.get('/', function (req, res) {
    //some code
})

module.exports = router