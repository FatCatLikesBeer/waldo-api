const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/easy', indexController.easy);

router.get('/medium', indexController.medium);

router.get('/hard', indexController.hard);

router.get('/test', indexController.test);

module.exports = router;
