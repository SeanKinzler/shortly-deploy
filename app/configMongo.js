var mongoose = require('mongoose');

var uri = process.env.MONGO_URI || 'mongodb://localhost/shortly-deploy';

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  var urlSchema = mongoose.Schema({
    id: ObjectId,
    url: String,
    baseUrl: String,
    code: String,
    title: String,
    visits: Number,
    timestamps: Date
  });
  var userSchema = mongoose.Schema({
    id: ObjectId,
    username: String,
    password: String,
    timestamps: Date
  });

  var Url = mongoose.model('Url', urlSchema);
  var User = mongoose.model('User', userSchema);
});


module.exports = db;