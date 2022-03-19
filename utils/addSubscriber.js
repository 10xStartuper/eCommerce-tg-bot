const { Subscriber } = require('../models');

const addSubcriber = (ctx) => {
  const subscriber = new Subscriber({ user_id: ctx.from.id });
  subscriber.save((err) => {
    if (err) {
      return false;
    }
    return true;
  });
  console.log(subscriber);
};

module.exports = addSubcriber;
