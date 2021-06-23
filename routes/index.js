const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
  const title = 'welcome';
  res.render('index/welcome', {
    title
  });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  const title = 'dashboard';
  Story.find({ user: req.user.id })
    .then(stories => {
      res.render('index/dashboard', {
        stories,
        title
      });
    });
});

router.get('/about', (req, res) => {
  const title = 'about';
  res.render('index/about', {
    title
  });
});


module.exports = router;
