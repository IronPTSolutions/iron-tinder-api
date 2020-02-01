const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Like = require('../models/like.model');

module.exports.like = (req, res, next) => {
  const params = { 
    toUser: req.params.id,
    fromUser: req.currentUser.id
  } 

      const newLike = new Like(params)

      newLike.save()
        .then(() => {
          Like.findOne(
            {
              toUser: req.currentUser.id,
              fromUser: req.params.id,
              status: true
            }
          )
          .then((like) => {
            if(like) {
              const newMatch = new Match({
                userA: req.currentUser.id, 
                userB: req.params.id
              })
              
              newMatch.save()
                .then(() => {
                  Match.findOne()
                })
            }
          }
          )
          res.json({ 
            like: req.params.id,  
            Match: req.params.id })
        })
        .cath(next)
}