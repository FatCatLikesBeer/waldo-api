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

  if (game === "text" | game === "waldo" | game === "coins") {
    gameData.game = game;
  } else {
    gameData.game = "text";
  }

  const sessionId = generateSessionId();
  res.cookie('sessionId', sessionId);
  console.log(gameData);
  res.json(gameData);
});

function generateSessionId() {
  return Math.random().toString(36).substr(2, 10);
}
