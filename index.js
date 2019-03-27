'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Settings

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Connecting to DB

mongoose.connect('mongodb://localhost:27017/guides', {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(db => console.log('DB connected'))
  .catch(err => console.log(err));

// Import models

const Guide = require('./models/guide');

// Middlewares

// Routes

app.get('/api/guide', (req, res) => {
  Guide.find({}, (err, guides) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      });
    }
    if (!guides) {
      return res.status(404).send({
        message: `There aren't guides.`
      });
    }
    res.status(200).send({ guides });
  });
});

app.get('/api/guide/:guideId', (req, res) => {
  let guideId = req.params.guideId;

  Guide.findById(guideId, (err, guide) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      });
    }
    if (!guide) {
      return res.status(404).send({
        message: `The guide doesn't exist.`
      });
    }
    res.status(200).send({ guide });
  });
});

app.post('/api/guide', (req, res) => {
  let guide = new Guide(req.body);
  
  guide.save((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error saving BD: ${err}`
      });
    } else {
      console.log(req.body);
      res.status(200).send({ data });
    }
  });
});

app.put('/api/guide/:guideId', (req, res) => {

});

app.delete('/api/guide/:guideId', (req, res) => {
  let guideId = req.params.guideId;

  Guide.findById(guideId, (err, guide) => {
    if (err) {
      res.status(500).send({
        message: `Error to delete the guide: ${err}`
      });
    }

    guide.remove(err => {
      if (err) {
        res.status(500).send({
          message: `Error to delete the guide: ${err}`
        });
      }
      res.status(200).send({
        message: `The guide has delete.`
      });
    });
  });
});

// Starting the server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});