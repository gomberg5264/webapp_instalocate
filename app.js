/**
 * Created by arjunrajpal on 23/04/17.
 */
var express = require('express')
var cheerio = require('cheerio')
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')

console.log("hello")

var app = express()

var api = require('./api')
app.use('/api',api)

//Body-Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname,'/views')))

app.get('/',function (req,res) {
    res.sendFile("views/index.html")
});

app.set('port',2000)
app.listen(app.get('port'))