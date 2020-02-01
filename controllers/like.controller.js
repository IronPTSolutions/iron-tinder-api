const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Like = require('../models/like.model');

module.exports.like = (req, res, next) => {
  const params = { 
    toUser: req.params.id,
    fromUser: req.currentUser.id
  }

  Like.findOne(params)
  .then(like => {
    if(like) {
      Like.findByIdAndRemove(like.id)
      .then(() => {
        res.json({ likes: -1 })
      }).cath(next)
    } else {
      const like = new Like(params)

      like.save()
        .then(() => {
          res.json({ likes: 1 })
        }).cath(next)
    }
  }).catch(next)
}