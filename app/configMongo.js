var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var uri = process.env.MONGO_URI || 'mongodb://localhost/shortly-deploy';

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
});

module.exports = db;
