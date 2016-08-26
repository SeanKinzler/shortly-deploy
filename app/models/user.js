var db = require('../configMongo');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  id: ObjectId,
  username: String,
  password: String,
  timestamps: Date
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  var context = this;
  bcrypt.compare(attemptedPassword, context.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.pre('save', function(cb) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      cb();
    });
});
var User = mongoose.model('User', userSchema);

module.exports = User;
