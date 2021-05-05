const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
const database = require('./models/db')
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.use('/auction', require('./controller'));

app.listen(3000);
