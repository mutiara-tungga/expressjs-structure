var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    userMiddleware = require('../middlewares/users');

router.post('/', userMiddleware.inputValidationForCreate, userController.createNewUser);

module.exports = router;