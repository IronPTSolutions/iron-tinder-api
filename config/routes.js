const express = require('express');
const router = express.Router();
const matchs = require('matchs.controller.js');
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('./cloudinary.config');


router.get('/', controller.base);

//USERS

//LIKES

//MATCHS

router.get('/matchs', matchsController.do);
router.post('/matchs', matchsController.create);



module.exports = router;
