const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/intro', indexController.intro);

router.get('/easy', indexController.easy);

router.get('/medium', indexController.medium);

router.get('/hard', indexController.hard);

router.get('/test', indexController.test);

router.get('/leaderboard', indexController.leaderboard_get);

router.post('/leaderboard', indexController.leaderboard_post);

module.exports = router;
