var express = require('express');
var router = express.Router();

/* GET user welcome message by user ID */
router.get('/:userid?', function(req, res, next) {
  const userid = req.params.userid;

  console.log('Received userid:', userid); // Log for debugging

  if (userid) {
      // If userid is provided, send a welcome message
      res.send(`Bem-vindo, usuário ${userid}!`); // Welcome message in Portuguese
  } else {
      // If no userid is provided, redirect to the signup page
      res.redirect('/users/signup');
  }
});

module.exports = router;