const express = require('express');
const router = express.Router();
const matchs = require('matchs.controller.js');
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('./cloudinary.config');


router.get('/', controller.base);

//USERS
router.post('/user/register', userController.register)

//LIKES
router.post('/user/:id/:status', likeController.like);

//MATCHS

router.get('/matchs', matchsController.do);
router.post('/matchs', matchsController.create);



module.exports = router;
