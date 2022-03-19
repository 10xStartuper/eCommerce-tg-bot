const router = require('express').Router();
router.get('/register/:id', (req, res) => {
  res.render('register', { id: req.params.id });
});

router.post('/register', (req, res) => {
  res.json({ data: req.body });
});

router.get('*', (req, res) => {
  res.json('404');
});
module.exports = router;
