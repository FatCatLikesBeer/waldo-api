const asyncHandler = require('express-async-handler');
const cookieParser = require('cookie-parser');
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
  const gameName = "intro";
  if (req.session[gameName].win == true) {
    // Force a new game if client has previous win
    req.query.name = null;
    console.log(req.query.name);
  };
  if (!req.query.name) {

    // New Game
    newGameInit(req.session, gameName, newGameData);
    res.json({ location: null, success: false, win: false, time: null });
  } else {

    // Parse out game data
    const locationName = req.query.name;
    const locationCoords = [req.query.locX, req.query.locY];
    const gameData = req.session[gameName];

    // Do stuff with game data
    const responseObject = coordinateComparator(gameName, locationName, locationCoords);
    gameData.score[locationName] = responseObject.success;
    winChecker(responseObject, gameData);
    console.log(gameData);

    // Return actioned game data
    req.session[gameName] = gameData;
    res.json(responseObject);
  };
};

//// ==== EASY CONTROLLER ==== ////
exports.easy = (req, res, next) => {
  const gameName = "easy";
  if (req.session[gameName].win == true) {
    // Force a new game if client has previous win
    req.query.name = null;
    console.log(req.query.name);
  };
  if (!req.query.name) {

    // New Game
    newGameInit(req.session, gameName, newGameData);
    res.json({ location: null, success: false, win: false, time: null });
  } else {

    // Parse out game data
    const locationName = req.query.name;
    const locationCoords = [req.query.locX, req.query.locY];
    const gameData = req.session[gameName];

    // Do stuff with game data
    const responseObject = coordinateComparator(gameName, locationName, locationCoords);
    gameData.score[locationName] = responseObject.success;
    winChecker(responseObject, gameData);
    console.log(gameData);

    // Return actioned game data
    req.session[gameName] = gameData;
    res.json(responseObject);
  };
};

//// ==== MEDIUM CONTROLLER ==== ////
exports.medium = (req, res, next) => {
  const gameName = "medium";
  if (req.session[gameName].win == true) {
    // Force a new game if client has previous win
    req.query.name = null;
    console.log(req.query.name);
  };
  if (!req.query.name) {

    // New Game
    newGameInit(req.session, gameName, newGameData);
    res.json({ location: null, success: false, win: false, time: null });
  } else {

    // Parse out game data
    const locationName = req.query.name;
    const locationCoords = [req.query.locX, req.query.locY];
    const gameData = req.session[gameName];

    // Do stuff with game data
    const responseObject = coordinateComparator(gameName, locationName, locationCoords);
    gameData.score[locationName] = responseObject.success;
    winChecker(responseObject, gameData);
    console.log(gameData);

    // Return actioned game data
    req.session[gameName] = gameData;
    res.json(responseObject);
  };
};

//// ==== HARD CONTROLLER ==== ////
exports.hard = (req, res, next) => {
  const gameName = "hard";
  if (req.session[gameName].win == true) {
    // Force a new game if client has previous win
    req.query.name = null;
    console.log(req.query.name);
  };
  if (!req.query.name) {

    // New Game
    newGameInit(req.session, gameName, newGameData);
    res.json({ location: null, success: false, win: false, time: null });
  } else {

    // Parse out game data
    const locationName = req.query.name;
    const locationCoords = [req.query.locX, req.query.locY];
    const gameData = req.session[gameName];

    // Do stuff with game data
    const responseObject = coordinateComparator(gameName, locationName, locationCoords);
    gameData.score[locationName] = responseObject.success;
    winChecker(responseObject, gameData);
    console.log(gameData);

    // Return actioned game data
    req.session[gameName] = gameData;
    res.json(responseObject);
  };
};

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
});

exports.leaderboard_post = asyncHandler(async (req, res, next) => {
});

exports.test = asyncHandler(async (req, res, next) => {
  console.log(req.session);
  const message = {
    status: "success",
    game: req.query.game,
    locX: req.query.locX,
    locY: req.query.locY,
    cookies: req.cookies,
  };
  res.json(message);
});
