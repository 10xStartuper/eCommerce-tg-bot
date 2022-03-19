const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const subscriberSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timespamp: true,
  }
);
subscriberSchema.plugin(validator);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
