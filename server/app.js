const express = require('express');
const app = express();

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
  res.header(200);
  res.send('success');
});

app.get('/api/camps/:id/reservation', (req, res) => {

  let query = req.query;
  res.header(200);
  res.send('success')
});

