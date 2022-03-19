const { Subscriber } = require('../models');
const User = require('../models/user.model');

const registerUser = (req, res) => {
  const subscriber = Subscriber.findOne({ user_id: req.body.user_id });
  if (subscriber) {
    const user = User.findOne({ user_id: req.body.user_id });
    console.log(user.user_id);
    if (!user) {
      const { user_id, first_name, last_name, email, phone } = req.body;
      const new_user = new User({
        user_id,
        first_name,
        last_name,
        email,
        phone,
      });
      new_user.save((err) => {
        if (err) {
          return res.status(500).render('page', {
            message: 'An error occured while registering user',
            err: err?.message || 'An error occurred',
          });
        }
        return res.status(200).render('page', {
          message: 'User registered successfully',
          err: err?.message,
        });
      });
    } else {
      return res.status(200).render('page', {
        message: 'User already registered',
        err: 'Already registered',
      });
    }
  } else {
    return res.status(500).render('page', {
      message: 'User did not join the bot',
      err: 'User did not join the bot yet',
    });
  }
};

module.exports = { registerUser };
