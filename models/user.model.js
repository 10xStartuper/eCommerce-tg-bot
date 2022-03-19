const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const userScheme = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  balance: { type: Number, required: false, default: 0 },
});

userScheme.plugin(validator);

const User = mongoose.model('User', userScheme);

module.exports = User;
