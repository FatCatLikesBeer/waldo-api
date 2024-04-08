const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.post('/new-game', indexController.createGame);

module.exports = router;
