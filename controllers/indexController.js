const asyncHandler = require('express-async-handler');
const { encrypt, decrypt } = require('./encryptAndDecrypt');
const { newGameData } = require('./gameLogic.js');

exports.index = asyncHandler(async (req, res, next) => {
  const result = { message: "What are you doing here" };
  res.json(result);
});

//// ==== INTRO CONTROLLER ==== ////
exports.intro = (req, res, next) => {
  const gameName = "intro";
  if (!req.body.score) {

    // New Game
    const result = newGameData();
    res.json(result);
  } else {

    // One by one, the logic found its way to single function 😂
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== EASY CONTROLLER ==== ////
exports.easy = (req, res, next) => {
  const gameName = "easy";
  if (!req.body.score) {

    // New Game
    const result = newGameData();
    res.json(result);
  } else {

    // One by one, the logic found its way to single function 😂
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== MEDIUM CONTROLLER ==== ////
exports.medium = (req, res, next) => {
  const gameName = "medium";
  if (!req.body.score) {

    // New Game
    const result = newGameData();
    res.json(result);
  } else {

    // One by one, the logic found its way to single function 😂
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== HARD CONTROLLER ==== ////
exports.hard = (req, res, next) => {
  const gameName = "hard";
  if (!req.body.score) {

    // New Game
    const result = newGameData();
    res.json(result);
  } else {

    // One by one, the logic found its way to single function 😂
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
});

exports.leaderboard_post = asyncHandler(async (req, res, next) => {
});

exports.test = asyncHandler(async (req, res, next) => {
});

exports.test_post = async (req, res, next) => {
};
