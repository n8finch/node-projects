//Grab available packages
//=======================
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var accessTokens = require('./private/keys');

//Config the app
//=======================
//tell node where to look for site resouces
app.use(express.static(__dirname + '/public'));

//set view engine to EJS
app.set('view engine', 'ejs');

//config instagram app with client id
ig.use({
    access_token: accessTokens.access_token
});

//could use this, seems broken, check docs
// ig.use({
//     client_id: 'accessTokens.client_id',
//     client_secret: 'accessTokens.client_secret'
// });

//Set routes
//=======================
//home page route - our profile's main images
app.get('/', function (req, res) {
    //use instagram package to get profile media
    ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
        //render the homepage and pass in the profile's image
        res.render('pages/index', { grams: medias });
    });

});

//Start server
//=======================
app.listen(8080);
console.log('App started! Look at http://localhost:8080');