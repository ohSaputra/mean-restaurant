var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    default: "user" 
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', userSchema);
