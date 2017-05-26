var express = require('express'),
    router = express.Router(),

    randomstring = require('randomstring'),
    postmark = require('postmark'),
    bcrypt = require('bcrypt'),

    userModel = require('../models/userModel'),
    config = require('../config');

var client = new postmark.Client(config.apiKeyPostmarkapp);

exports.createNewUser = function (req, res) {
    var body = req.body;
    var activationCode = randomstring.generate(20);
    var linkActivation = config.baseurl + '/user/activation' + "?code=" + activationCode + "&email=" + body.email;
    var hashPassword = bcrypt.hashSync(body.password, 10);

    var user = {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        password: hashPassword,
        activation_code: activationCode
    }

    userModel
        .create(user, activationCode)
        .then(function (user) {
            client.sendEmail({
                "From": config.postmarkappServiceSender,
                "To": user.get('email'),
                "Subject": "Account Activation",
                "TextBody": "Hello",
                "HtmlBody": "<html><body><p> Your Account : <br> First Name : "
                + user.get('first_name') + "<br> - Last Name : "
                + user.get('last_name') + "<br> - Email : "
                + user.get('email') + "<br> - Password : "
                + body.password + "<br>To activate your account visit link below : <a href='"
                + linkActivation + "'>Activate my account</a></p></body></html>"
            });
            res.send({
                first_name: user.get('first_name'),
                last_name: user.get('last_name'),
                email: user.get('email')
            });
        },function (error) {
            res.send({
                messageError: "Error " + error
            })
        })

}