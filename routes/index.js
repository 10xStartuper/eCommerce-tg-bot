const { registerUser } = require('../controllers/user.controller');

const router = require('express').Router();
router.get('/register/:id', (req, res) => {
  res.render('register', { id: req.params.id });
});

router.post('/register', registerUser);

router.get('*', (req, res) => {
  res.json('404');
});
module.exports = router;
