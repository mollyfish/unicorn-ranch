var express = require('express');
var bodyParser = require('body-parser');
var Unicorn = require(__dirname + '/../models/unicorn');
var handleError = require(__dirname + '/../lib/handleServerError');

var unicornsRouter = module.exports = exports = express.Router();

unicornsRouter.get('/unicorns', function(req, res) {
  Unicorn.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

// save this route for later expansion
// unicornsRouter.post('/unicorns', bodyParser.json(), function(req, res) {
//   var newUnicorn = new Unicorn(req.body);
//   newUnicorn.save(function(err, data) {
//     if (err) return handleError(err, res);
//     res.json(data);
//   });
// });

// update a unicorn's information
unicornsRouter.put('/unicorns/update', bodyParser.json(), function(req, res) {
  var unicornData = req.body;
  // prevent _id conflicts
  var oldId = unicornData._id;
  delete unicornData._id;
  // "updateOne" must be used instead of plain old "update"
  Unicorn.updateOne({_id: oldId}, unicornData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'hooray! It works!'});
  });
});

// save this route for later expansion
// unicornsRouter.delete('/unicorns/:id', function(req, res) {
//   Unicorn.remove({_id: req.params.id}, function(err) {
//     if (err) return handleError(err, res);

//     res.json({msg: 'success!'});
//   });
// });
