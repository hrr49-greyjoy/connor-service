const express = require('express');
const app = express();
const db = require('../database/database.js');
const parseUnavailableDates = require('../helpers/parseUnavailableDates.js');
const getPricing = require('../helpers/getPricing.js');

app.listen(3004, (err) => {
  if(err) {
    throw err;
  } else {
    console.log('listening on port 3004');
  }
})

app.use(express.static(__dirname + '/../client/dist'));


app.get('/api/camps/:id/calendar', (req, res) => {
  let id = req.params.id;
  db.getUnavailableDates(id)
    .then((results) => {
      let parsedData = parseUnavailableDates(results);
      res.header(200);
      res.json(parsedData);
    })
});

app.get('/api/camps/:id/reservation', (req, res) => {

  let query = req.query;
  db.getListingPriceById(req.params.id)
    .then((results) => {
      let data = getPricing(results, req.query);
      res.header(200);
      res.json(data);
    })
});


module.exports = app;