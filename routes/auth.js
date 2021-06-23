const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email']  }));

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/verified', (req, res) => {
  req.user ? console.log(req.user) : console.log('Not Auth');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'you are logged out');
  res.redirect('/');
});


module.exports = router;
