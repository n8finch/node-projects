//Grab available packages
//=======================
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var accessToken = require('./private');

//Config the app
//=======================
//tell node where to look for site resouces
app.use(express.static(__dirname + '/public'));

//set view engine to EJS
app.set('view engine', 'ejs');

//config instagram app with client id
ig.use({
    access_token: accessToken
});

//could use this, seems broken, check docs
// ig.use({
//     client_id: '76ec3ad7d5bd431fabcd95fc245cf4da',
//     client_secret: '13d80d6d38e14ec68c9484e127244f76'
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