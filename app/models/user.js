var db = require('../configMongo');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var userSchema = mongoose.Schema({
  id: ObjectId,
  username: String,
  password: String,
  timestamps: Date
});


// User.on('init', function() {

// });

userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  console.log('this: ', this);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.pre('save', function(cb) {
  userSchema.methods.hashPassword();
  cb();
});
var User = mongoose.model('User', userSchema);

module.exports = User;
