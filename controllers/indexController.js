const asyncHandler = require('express-async-handler');
const { encrypt, decrypt } = require('./encryptAndDecrypt');
const { newGameData, coordinateComparator } = require('./gameLogic.js');
const { body, validationResult } = require('express-validator');
const IntroModel = require('../models/introSchema');
const EasyModel = require('../models/easySchema');
const MediumModel = require('../models/mediumSchema');
const HardModel = require('../models/hardSchema');

exports.index = asyncHandler(async (req, res, next) => {
  const result = { message: "What are you doing here" };
  res.json(result);
});

//// ==== INTRO GAME CONTROLLER ==== ////
exports.intro = (req, res, next) => {
  const gameName = "intro";
  if (!req.body.score) {

    // New Game
    const result = newGameData(gameName);
    res.json(result);
  } else {

    // One by one, the logic found its way to single function 😂
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== EASY GAME CONTROLLER ==== ////
exports.easy = (req, res, next) => {
  const gameName = "easy";
  if (!req.body.score) {
    const result = newGameData(gameName);
    res.json(result);
  } else {
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== MEDIUM GAME CONTROLLER ==== ////
exports.medium = (req, res, next) => {
  const gameName = "medium";
  if (!req.body.score) {
    const result = newGameData(gameName);
    res.json(result);
  } else {
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

//// ==== HARD GAME CONTROLLER ==== ////
exports.hard = (req, res, next) => {
  const gameName = "hard";
  if (!req.body.score) {
    const result = newGameData(gameName);
    res.json(result);
  } else {
    const result = coordinateComparator(gameName, req.body);
    res.json(result);
  };
};

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
});

exports.leaderboard_post = [
  body("name", "Name requires minimum 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("name", "Name can not be more than 10 characters in length")
    .trim()
    .isLength({ max: 10 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const [
      name,
      time,
      gameName,
      encryptedScore
    ] = [
        req.body.name,
        req.body.time,
        req.body.gameName,
        req.body.score,
      ];
    let score;
    try {
      score = decrypt(encryptedScore);
    } catch (error) {
      console.error("Could not decrypt score!", error);
      res.json({
        success: false,
        message: "Score is not genuine",
      });
    }
    if (score.first && score.second && score.third) {
      let win;
      let WinningModel;
      switch (gameName) {
        case "intro":
          WinningModel = IntroModel;
          break;
        case "easy":
          WinningModel = EasyModel;
          break;
        case "medium":
          WinningModel = MediumModel;
          break;
        case "hard":
          WinningModel = HardModel;
          break;
        default:
          break;
      }
      win = new WinningModel({
        name: name,
        time: time,
      });
      if (!errors.isEmpty()) {
        const resultObject = {
          success: false,
          message: errors.errors[0].msg,
        }
        res.json(resultObject);
      } else {
        await win.save();
        const resultObject = {
          success: true,
          message: "You're on the leaderboard!",
        }
        res.json(resultObject);
      }
    } else {
      console.error("Goals contain losses...");
      console.error("First Goal", score.first);
      console.error("Second Goal", score.second);
      console.error("Third Goal", score.third);
      const responseObject = {
        success: false,
        message: "Don't try and cheat, your goals contain losses!",
      };
      res.json(responseObject);
    }
  })
];

exports.test = asyncHandler(async (req, res, next) => {
});

exports.test_post = async (req, res, next) => {
};
