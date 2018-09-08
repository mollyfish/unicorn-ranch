var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var unicornSchema = new Schema({
  name: String,
  location: String,
  favoriteFood: String
});

module.exports = mongoose.model('Unicorn', unicornSchema, 'Unicorn');
