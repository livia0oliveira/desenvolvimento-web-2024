var express = require('express');
var router = express.Router();
var signupRouter = require('./signup');

router.use('/signup', signupRouter);

/* GET home page. */
router.get('/:userid', function(req, res, next) {
  const userid = req.params.userid;

  if (userid) {
    res.render('signin', { title: 'Signed', username: userid});
  } else {
    res.redirect('/users/signup');
  }
});

module.exports = router;
