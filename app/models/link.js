var db = require('../configMongo');
var mongoose = require('mongoose');
var crypto = require('crypto');

var urlSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: Date
});

urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
