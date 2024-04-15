// gameLogic.js
const { encode, decode } = require('./encryptAndDecrypt.js');

// New game data
exports.newGameData = function() {
  result = {
    startTime: new Date(),
    win: false,
    score: {
      first: false,
      second: false,
      third: false,
    }
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

