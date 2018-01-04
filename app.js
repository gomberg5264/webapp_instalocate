/**
 * Created by arjunrajpal on 23/04/17.
 */
var express = require('express')
var cheerio = require('cheerio')
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')

console.log("Server running");

var app = express()

var api = require('./api')
app.use('/api',api);

//Body-Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect('mongodb://admin:admin@ds237947.mlab.com:37947/webapp_instalocate');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname,'/views')));

app.get('/',function (req,res) {
    res.sendFile("views/index.html")
});

app.set('port',(process.env.PORT || 2000));
app.listen(app.get('port'));