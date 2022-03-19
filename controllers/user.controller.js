const User = require('../models/user.model');

const registerUser = (req, res) => {
  const { user_id, first_name, last_name, email, phone } = req.body;
  const user = new User({
    user_id,
    first_name,
    last_name,
    email,
    phone,
  });
  user.save((err) => {
    if (err) {
      return res.status(500).render('page', {
        message: 'An error occured while registering user',
        err: err.message,
      });
    }
    return res.status(200).render('page', {
      message: 'User registered successfully',
      err: err?.message,
    });
  });
};

module.exports = { registerUser };
