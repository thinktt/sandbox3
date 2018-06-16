//...........Load modules used in the app.......
var express = require('express');//get the express framework
var app = express();// app becomes an instance of an express server
var morgan = require('morgan');//morgan is the express middleware logger
//var bodyParser = require('body-parser');// for parsing json request
var path = require('path');
//var config = require('./config-map');
//var logging = require('./logging-middleware.js'); //morgan .js JSON wrapper
var fallback = require('express-history-api-fallback'); 
if (process.env !== 'production') require('dotenv').config();

//..............Load Config Vars.................
var port = process.env.PORT || 8080;

//...........Load in middleware................
//app.use(logging()); // log all request and errors
//app.use(bodyParser.json()); //pareses json request
app.use(express.static('dist'));//serve static files

app.get('/config.json', (req, res) => {
  res.json({
    RECKER_URI:  process.env.RECKER_URI,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    API_KEY:  process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    METRICS_PORTAL_PROD_URL:process.env.METRICS_PORTAL_PROD_URL,
    METRICS_PORTAL_STAGE_URL : process.env.METRICS_PORTAL_STAGE_URL,
    MOCK_API_BOOL: process.env.MOCK_API_BOOL
  }); 
});

app.get('/recker/*', function(req, res) {
  res.sendFile(path.resolve('dist/recker/index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.resolve('dist/rehub/index.html'));
});


//.............Start the server............
app.listen(port, function(err) {
  if(err) {
    console.log('Unable to start server:');
    console.log(err);
  }
  else {
    console.log('Server listening on port ', port);
  }
});
