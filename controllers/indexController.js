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

//// ==== GET LEADERBOARD ==== ////
exports.leaderboard_get = asyncHandler(async (req, res, next) => {
  const gameName = req.query.name;
  let LeaderBoard;
  try {
    switch (gameName) {
      case "intro":
        LeaderBoard = IntroModel;
        break;
      case "easy":
        LeaderBoard = EasyModel;
        break;
      case "medium":
        LeaderBoard = MediumModel;
        break;
      case "hard":
        LeaderBoard = HardModel;
        break;
      default:
        throw new Error("Game name is not in URI");
        break;
    };
  } catch (error) {
    console.log(error);
    const errorMessage = "Game name is incorrect.";
    res.json({
      success: false,
      message: errorMessage,
    });
    return;
  };
  const leaderBoard = await LeaderBoard.find().sort({ date: 1 }).exec();
  res.json({
    success: true,
    message: `Leader Board Fetch Success for ${gameName}`,
    data: leaderBoard,
  })
});

//// ==== POST TO LEADERBOARD ==== ////
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
      const errorMessage = "Score is not genuine!";
      console.error(errorMessage, error);
      res.json({
        success: false,
        message: errorMessage,
      });
      return;
    };
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

//// ==== TEST GET REQUESTS HERE ==== ////
exports.test = asyncHandler(async (req, res, next) => {
});

//// ==== TEST POST REQUESTS HERE ==== ////
exports.test_post = async (req, res, next) => {
};
