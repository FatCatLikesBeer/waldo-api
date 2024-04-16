// gameLogic.js
const { encrypt, decrypt } = require('./encryptAndDecrypt');

// New game data
exports.newGameData = function() {
  const scoreData = {
    first: false,
    second: false,
    third: false,
    startTime: new Date(),
  };
  const score = encrypt(scoreData);
  const result = {
    location: null,
    success: false,
    win: false,
    score: score,
  };
  return result;
};

// New game init
exports.newGameInit = function(session, gameName, newGameData) {
  session[gameName] = null;
  session[gameName] = newGameData();
}

// Compare Coordinate Data
// A truth table is the first thing which came to mind
// with which to compare if both values were correct.
// That's what I get for studying philosophy
exports.coordinateComparator = function(gameName, locationName, locationCoords) {
  let truthTable = [false, false];
  let coords = JSON.parse(process.env[gameName])[locationName];

  const responseObject = {
    location: locationName,
    success: false,
    win: null,
    time: null,
  };

  for (index in locationCoords) {
    const upper = coords[index] + 15;
    const lower = coords[index] - 15;
    const point = locationCoords[index];
    if (point <= upper && point >= lower) {
      truthTable[index] = true;
    }
  }

  if (truthTable[0] && truthTable[1]) {
    responseObject.success = true;
  }

  return responseObject;
};

// Win Checker
exports.winChecker = function(responseObject, gameData) {
  result = gameData.score.first && gameData.score.second && gameData.score.third;
  if (result) {
    const startTime = new Date(gameData.startTime);
    const endTime = new Date();
    responseObject.time = endTime - startTime;
  }
  gameData.win = responseObject.win = result;
};

