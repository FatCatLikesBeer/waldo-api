const asyncHandler = require('express-async-handler');
const cookieParser = require('cookie-parser');

exports.index = asyncHandler(async (req, res, next) => {
  if (req.cookies.sessionId) {
    const sessionId = req.cookies.sessionId;
    res.send(`You're back ${sessionId}`);
  } else {
    const sessionId = generateSessionId();
    res.cookie('sessionId', sessionId);
    res.send("Welcome! Your session has been created");
  }
});

exports.createGame = asyncHandler(async (req, res, next) => {
  const game = req.body.game;
  const gameData = {
    game: "",
    src: "Temp String",
    date: new Date().toISOString(),
  };

  switch (game) {
    case "text":
      gameData.game = "text";
      break;
    case "waldo":
      gameData.game = "waldo";
      break;
    case "coins":
      gameData.game = "coins";
      break;
    default:
      gameData.game = "text";
      break;
  };

  const sessionId = generateSessionId();
  res.cookie('sessionId', sessionId);
  res.json(gameData);
});

function generateSessionId() {
  return Math.random().toString(36).substr(2, 10);
}
