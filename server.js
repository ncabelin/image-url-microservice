// Image Search API microservice
// -----------------------------
require('dotenv').config();
let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    imageSearch = require('node-google-image-search'),
    port = process.env.PORT || 8080,
    ip = process.env.IP;

mongoose.connect(process.env.DB_URL);
const searchSchema = new mongoose.Schema({
  term: String,
  when: Date
});

let Search = mongoose.model('Search', searchSchema);

app.get('/', function(req, res) {
  res.status(200)
    .json({'message': 'Image API Search can be called by entering /api/<search-term> optional:add ex.?offset=11'});
});

app.get('/api/:term', function(req, res) {
  const term = req.params.term;
  const offset = req.query.offset || 0;
  let results = [];

  imageSearch(term, function(data) {
    // get data and assign to results
    data.forEach(function(d) {
      results.push({
        'link': d.link,
        'pageURL': d.displayLink,
        'alt': d.snippet
      });
    });

    // record search term and date
    Search.create({
      term: term,
      when: new Date()
    }, function(err, search) {
      if (err) {
        console.log('error recording:' + err);
      } else {
        search.save(function(error, s) {
          if (error) {
            console.log('error saving:' + error);
          } else {
            console.log('saved search term');
          }
        });
      }
    });

    // respond with JSON
    res.status(200).json(results);
  }, offset, 10);
});

app.get('/recent', function(req, res) {
  let recentSearches = [];
  Search.find({}).limit(10).exec(function(err, searches) {
    searches.forEach((data) =>
      recentSearches.push({
        term: data.term,
        when: data.when
      })
    );

    res.json(recentSearches);
  });
});

app.listen(port, ip, function() {
  console.log('Server started at port :' + port);
});
