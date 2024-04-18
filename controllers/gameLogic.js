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

// Win Checker
function winChecker(gameData, score, responseObject) {
  // Are all the scores true?
  const didPlayerWin = score.first && score.second && score.third;

  if (didPlayerWin) {
    const startTime = new Date(score.startTime);
    const endTime = new Date();
    const duration = endTime - startTime;
    responseObject.time = duration;
    responseObject.url = "http://free.local:3000/leaderboard";
    responseObject.win = didPlayerWin;
  };
};

// Compare Coordinate Data
// A truth table is the first thing which came to mind
// with which to compare if both locations were correct.
// That's what I get for studying philosophy...
exports.coordinateComparator = function(gameName, gameData) {
  // Decrypt previous user scores
  const score = decrypt(gameData.score);

  // Parse out user data
  const locationCoords = [gameData.locX, gameData.locY];
  const locationName = gameData.location;

  // Pull goal coordinates from .env file.
  const coords = JSON.parse(process.env[gameName])[locationName];

  // Create comparison variables
  let truthTable = [false, false];

  // Create the data to be sent
  const responseObject = {
    location: locationName,
    success: false,
    score: null,
  };

  // Check if each location is correct in
  // both X & Y axis, with some leeyway
  for (index in locationCoords) {
    const upper = coords[index] + 15;
    const lower = coords[index] - 15;
    const point = locationCoords[index];
    if (point <= upper && point >= lower) {
      truthTable[index] = true;
    }
  }

  // Check if both locations are correct
  if (truthTable[0] && truthTable[1]) {
    responseObject.success = true;
  }

  // Set location score & check if win
  score[locationName] = responseObject.success;
  winChecker(gameData, score, responseObject);

  // Encrypt score
  responseObject.score = encrypt(score);

  console.log(responseObject);
  // Return data
  return responseObject;
};


