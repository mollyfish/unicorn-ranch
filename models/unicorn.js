var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
  name: String,
  location: String,
  favoriteFood: String
});

module.exports = mongoose.model('Unicorn', unicornSchema);
