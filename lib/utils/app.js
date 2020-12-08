const express = require('express');
const Food = require('./model/Foods');
const app = express();
app.use(express.json());

// Create
app.post('/foods', (req, res) => {
  Food
    .insert(req.body)
    .then(food => res.send(food));
});

// READ
app.get('/foods', (req, res) => {
  Food
    .find()
    .then(food => res.send(food));
});
app.get('/foods/:id', (req, res) => {
  Food
    .findById(req.params.id)
    .then(foods => res.send(foods));
});

// UPDATE
app.put('/foods/:id', (req, res) => {
  Food
    .update(req.params.id, req.body)
    .then(foods => res.send(foods));
});

// DELETE
app.delete('/foods/:id', (req, res) => {
  Food
    .delete(req.params.id)
    .then(foods => res.send(foods));
});

module.exports = {
  app
};
