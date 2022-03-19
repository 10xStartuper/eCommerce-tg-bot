const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
  user_id: Number,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
  balance: Number,
});

const User = mongoose.model('User', userScheme);

module.exports = User;
