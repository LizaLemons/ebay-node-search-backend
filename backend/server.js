// requirements
var express = require('express');
var cors = require('cors');
var http = require('http');

// instantiate new express app & specify port
var app = express();
var port = process.env.PORT || 8080;

// tell app to use cors for AJAX
app.use(cors());

// routes || most specific on top like Rails
app.get('/items', function(req, res) {
  console.log("req.query:", req.query);
  console.log("req.query['search']:", req.query["search"]);

  // get search terms from request
  var searchQ = req.query["search"];

  // add them to url
  var url = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=LizaRamo-9fd5-49ea-a5fc-b445028114cc&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + searchQ + '&paginationInput.entriesPerPage=10&buyerPostalCode=10009&itemFilter(0).name=LocalSearchOnly&itemFilter(0).value=true&itemFilter(1).name=MaxDistance&itemFilter(1).value=5';

  // make API call to eBay
  var body = '';
  http.get(url, function(ebayRes) {
    ebayRes.on('data', function(d) {
      body += d;
    })
    ebayRes.on('end', function(){
      var jBody = JSON.parse(body);
      var allResults = jBody['findItemsByKeywordsResponse'][0]['searchResult'][0];
      res.json(allResults);
    });
  });
});

app.get('/', function(req, res) {
  res.send('This is the root route');
});

// start the server
app.listen(port);
console.log('started server on port:', port);
