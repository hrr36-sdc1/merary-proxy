const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const db = require('../database/queries');



app.use(express.static(__dirname + '/../public'));
app.use(cors({ 'origin': '*' }));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/shoes/:id', db.getShoeById);
app.post('/postshoes/10000001', db.createShoe);
app.put('/shoes/10000001', db.updateShoe);
app.delete('/shoes/:id', db.deleteShoe);

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})


module.exports = app;


