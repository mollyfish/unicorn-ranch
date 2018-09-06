var express = require('express');
var bodyParser = require('body-parser');
var unicorn = require(__dirname + '/../models/unicorn');
var handleError = require(__dirname + '/../lib/handleServerError');

var unicornsRouter = module.exports = exports = express.Router();

unicornsRouter.get('/unicorns', function(req, res) {
  console.log(res);
  unicorn.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

unicornsRouter.post('/unicorns', bodyParser.json(), function(req, res) {
  var newUnicorn = new Unicorn(req.body);
  newUnicorn.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

unicornsRouter.put('/unicorns/:id', bodyParser.json(), function(req, res) {
  var unicornData = req.body;
  delete unicornData._id;
  Unicorn.update({_id: req.params.id}, unicornData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

unicornsRouter.delete('/unicorns/:id', function(req, res) {
  Unicorn.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
