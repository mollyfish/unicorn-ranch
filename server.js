var mongoose = require('mongoose');
var express = require('express');
var app = express();

// line 6 had the error - the database names did not match here and in the CLI
// if a database is not generated with the name given here, it can be created
// in the CLI and the name can be provided here
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Unicorn');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var unicornsRouter = require(__dirname + '/routes/unicornRoutes');

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
