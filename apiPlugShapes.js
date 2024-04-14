// Send this request when game opens
// This is to start the clock
const newGameRequest = {
  name: gameName,
};

// Confirms that game is loaded
const newGameResponse = {
  success: true,
};

// Sends game data for server to track
const gameGoalRequest = {
  name: gameName,
  goal: goalName,
  location: [x, y],
};

// Response object for points and win
const gameGoalResponse = {
  point: true,
  win: false,
};
