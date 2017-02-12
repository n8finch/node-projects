var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupcontroller');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public/app'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());

//add the seed data
setupController(app);
//get apiController
apiController(app);


app.listen(port);
console.log('app is running');