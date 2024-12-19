var express = require('express');
var router = express.Router();
var signupRouter = require('./signup');

router.use('/signup', signupRouter);

/* GET user welcome message by user ID */
router.get('/:userid?', function(req, res, next) {
  const userid = req.params.userid;

  console.log('Received userid:', userid);

  if (userid) {
      res.send(`Bem-vindo, usuário ${userid}!`);
  } else {
      res.redirect('/users/signup');
  }
});

module.exports = router;
