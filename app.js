/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

var port = Number(process.env.PORT || 5000);
app.listen(port);