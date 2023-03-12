const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    nom: { type: String, required: true },
   prenom:{type:String,required:true},
   email:{type:String,required:true},
   numero:{type:Number,required:true},
   password:{type:String,required:true},
   role:{type:String,required:false},
  },
  { timestamps: false }
);

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });
  
  userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };
const User = mongoose.model("User", userSchema);
module.exports = User;
