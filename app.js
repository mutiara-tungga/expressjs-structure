var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(require('./routes'));

app.listen(port, function () {
    console.log('Listening port : ' + port);
});