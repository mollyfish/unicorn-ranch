var mongoose = require('mongoose');
var express = require('express');
var app = express();
var unicornsRouter = require(__dirname + '/routes/unicornRoutes');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/unicorns_dev');

app.use(express.static(__dirname + '/public'));

app.use('/api', unicornsRouter);

app.listen(port, function() {
  console.log('server up on port ' + port);
});

// MONGO DB NOTES

// IN THE TERMINAL, at the root of your project, make a directory called db
// this creates a fresh database for each app

// THEN run
// mongod --dbpath=./db --smallfiles

// IN MONGO
// > show dbs
// if your database does not show up, continue with the next command anyway and it will be created
// > use database_name
// switched to db database_name
// > db.workouts.find().pretty()
// returns all workout objects from the database
