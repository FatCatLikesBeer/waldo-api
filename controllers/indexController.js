const asyncHandler = require('express-async-handler');
const cookieParser = require('cookie-parser');

// New game data
function newGameData() {
  const time = new Date;
  const response = {
    score: 999,
    start: new Date,
  };
  return response;
};

// Position Compairator
function gameLogic(gameName, locName, locPositions) {
  const result = {
    location: locName,
    success: false,
    win: false,
  };
  const truths = JSON.parse(process.env.easy);
  let coords = [];
  switch (locName) {
    case "n":
      coords = truths.n;
      break;
    case "u":
      coords = truths.u;
      break;
    case "o":
      coords = truths.o;
      break;
    default:
      coords = [1, 2];
      break;
  }
  for (index in locPositions) {
    if (locPositions[index] >= coords[index] - 15) {
      if (locPositions[index] <= coords[index] + 15) {
        result.success = true;
      }
    } else {
      result.success = false;
    }
  }
  return result;
};

exports.index = asyncHandler(async (req, res, next) => {
  const result = { message: "What are you doing here" };
  res.json(result);
});

exports.easy = asyncHandler(async (req, res, next) => {
  if (!req.query.name) {
    req.session.easy = null;
    req.session.easy = newGameData();
    res.json(req.session.easy);
  } else {
    const name = req.query.name;
    const loc = [req.query.locX, req.query.locY];
    const gameData = req.session.easy;
    const score = req.session.easy.score;
    const result = gameLogic(name, "n", loc);
    res.json(result);
  }
});

exports.medium = asyncHandler(async (req, res, next) => {
});

exports.hard = asyncHandler(async (req, res, next) => {
});

exports.test = asyncHandler(async (req, res, next) => {
  console.log(req.session);
  const message = {
    status: "success",
    game: req.query.game,
    locX: req.query.locX,
    locY: req.query.locY,
    sessionId: req.session.visited,
    visited: req.session.visited,
  };
  res.json(message);
});

function generateSessionId() {
  return Math.random().toString(36).substr(2, 10);
}
