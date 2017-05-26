var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(require('./controllers'));

app.listen(port, function () {
    console.log('Listening port : ' + port);
});