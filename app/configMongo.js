var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var uri = process.env.MONGO_URI || 'mongodb://localhost/shortly-deploy';

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // var Url = mongoose.model('Url', urlSchema);
  // var User = mongoose.model('User', userSchema);
});

module.exports = db;
