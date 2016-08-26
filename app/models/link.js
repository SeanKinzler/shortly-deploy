var db = require('../configMongo');
var mongoose = require('mongoose');
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

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
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
