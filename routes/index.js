const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/leaderboard', indexController.leaderboard_get);

router.post('/intro', indexController.intro);

router.post('/easy', indexController.easy);

router.post('/medium', indexController.medium);

router.post('/hard', indexController.hard);

router.post('/test', indexController.test);

router.post('/leaderboard', indexController.leaderboard_post);

router.post('/test', indexController.test_post);

module.exports = router;
