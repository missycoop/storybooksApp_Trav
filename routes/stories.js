const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

router.get('/', ensureAuthenticated, (req, res) => {
  const title = 'stories';
  Story.find({ status: 'public' })
    .populate('user')
    .sort({date: 'desc'})
    .then(stories => {
      res.render('stories/index', {
        stories,
        title
      });
    });
});

// Show Single Story
router.get('/show/:id', (req, res) => {
  const title = 'single-story';
  Story.findOne({
    _id: req.params.id
  })
    .populate('user')
    .populate('comments.commentUser')
    .then(story => {
      if(story.status == 'public') {
        res.render('stories/show', {
          story,
          title
        });
      } else {
        if(req.user){
          if(req.user.id == story.user._id) {
            res.render('stories/show', {
              story,
              title
            });
          } else {
            res.redirect('/stories')
          }
        } else {
          res.redirect('/stories')
        }
      }
    });
});

// List stories from a single user
router.get('/user/:userId', (req, res) => {
  const title = 'stories list';
  Story.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories,
        title
      });
    });
});

// Logged in user stories
router.get('/my', ensureAuthenticated, (req, res) => {
  const title = 'user stories';
  Story.find({user: req.user.id})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories,
        title
      });
    });
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  const title = 'add story';
  res.render('stories/add', {
    title
  });
});

// Edit Story Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  const title = 'edit story';
  Story.findOne({
    _id: req.params.id
  })
    .then(story => {
      story.user != req.user.id ? res.redirect('/') : res.render('stories/edit', {
        story,
        title
      });
    });
});

// Process Add Story
router.post('/', (req, res) => {
  let allowComments;
  req.body.allowComments ? allowComments = true : allowComments = false;
  let errors = [];

  if(!req.body.title) {
    errors.push({text: "Please add a title"});
  }

  if(!req.body.body1) {
    errors.push({text: "Please add a text body"});
  }

  if(errors.length > 0) {
    res.render('stories/add', {
      errors: errors,
      title: req.body.title,
      body: req.body.body1
    });
  } else {
    const newStory = {
      title: req.body.title,
      status: req.body.status,
      body: req.body.body1,
      allowComments: allowComments,
      user: req.user.id
    };

    // Create Story
    new Story(newStory)
      .save()
      .then(story => {
        req.flash('success_msg', 'story added');
        res.redirect(`/stories/show/${story.id}`)
      });
  }
});

// Edit Form Process
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .then(story => {
      let allowComments;
      req.body.allowComments ? allowComments = true : allowComments = false;

      // New values
      story.title = req.body.title;
      story.status = req.body.status;
      story.body = req.body.body1;
      story.allowComments = allowComments;

      story.save()
        .then(story => {
          req.flash('success_msg', 'Story edited');
          res.redirect('/dashboard');
        });
    });
});

// Delete Story
router.delete('/:id', (req, res) => {
  Story.deleteOne({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Story removed');
      res.redirect('/dashboard');
    });
});

// Add Comment
router.post('/comment/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      const newComment = {
        commentBody: req.body.commentBody,
        commentUser: req.user.id
      }

      // Add to comment array
      story.comments.unshift(newComment);

      story.save()
        .then(story => {
          req.flash('success_msg', 'Comment added');
          res.redirect(`/stories/show/${story.id}`);
        });
    });
});

module.exports = router;
