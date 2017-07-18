// Image Search API microservice
// -----------------------------
require('dotenv').config();
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    imageSearch = require('node-google-image-search'),
    port = process.env.PORT || 8080,
    ip = process.env.IP;

mongoose.connect(process.env.DB_URL);

app.get('/', function(req, res) {
  res.status(200)
    .json({'message': 'Image API Search can be called by entering /api/<search-term> optional:add ex.?offset=11'});
});

app.get('/api/:term', function(req, res) {
  const term = req.params.term;
  const offset = req.query.offset || 0;
  let results = [];

  let result = imageSearch(term, function(data) {
    data.forEach(function(d) {
      results.push({
        'link': d.link,
        'pageURL': d.displayLink,
        'alt': d.snippet
      });
    });
    res.status(200).json(results);
  }, offset, 10);
});

app.listen(port, ip, function() {
  console.log('Server started at port :' + port);
});
