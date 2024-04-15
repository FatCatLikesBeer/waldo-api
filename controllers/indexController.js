const asyncHandler = require('express-async-handler');
const { encrypt, decrypt } = require('./encryptAndDecrypt');

const {
  coordinateComparator,
  newGameData,
  newGameInit,
  winChecker
} = require('./gameLogic.js');

exports.index = asyncHandler(async (req, res, next) => {
  const result = { message: "What are you doing here" };
  res.json(result);
});

//// ==== INTRO CONTROLLER ==== ////
exports.intro = (req, res, next) => {
};

//// ==== EASY CONTROLLER ==== ////
exports.easy = (req, res, next) => {
  const gameName = "easy";
  if (!req.query.name) {

    // New Game
    newGameInit(req.session, gameName, newGameData);
    res.json({ location: null, success: false, win: false, time: null });
  } else {
    // Force a new game if client has previous win
    if (req.session[gameName].win === true) {
      newGameInit(req.session, gameName, newGameData);
      res.json({ location: null, success: false, win: false, time: null });
    };

    // Parse out game data
    const locationName = req.query.name;
    const locationCoords = [req.query.locX, req.query.locY];
    const gameData = req.session[gameName];

    // Do stuff with game data
    const responseObject = coordinateComparator(gameName, locationName, locationCoords);
    gameData.score[locationName] = responseObject.success;
    winChecker(responseObject, gameData);

    // Return actioned game data
    req.session[gameName] = gameData;
    res.json(responseObject);
  };
};

//// ==== MEDIUM CONTROLLER ==== ////
exports.medium = (req, res, next) => {
};

//// ==== HARD CONTROLLER ==== ////
exports.hard = (req, res, next) => {
};

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
});

exports.leaderboard_post = asyncHandler(async (req, res, next) => {
});

exports.test = asyncHandler(async (req, res, next) => {
  console.log(req.session);
  const message = {
    status: "success",
    name: req.query.name,
    locX: req.query.locX,
    locY: req.query.locY,
  };

  const encryptedObject = encrypt(message);
  console.log(encryptedObject);
  const decryptedObject = decrypt(encryptedObject);
  console.log(decryptedObject);
  res.json(decryptedObject);
});
