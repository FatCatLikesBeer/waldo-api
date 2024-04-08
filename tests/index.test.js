const request = require('supertest');
const indexRouter = require('../routes/index.js');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false })); // Not sure what this does
app.use(express.json());                          // This is needed to accept JSON requests
app.use('/', indexRouter);

//// ------ MongoDB Stuff ------ ////

// GET Index
// test('Test GET index', async () => {
//   const result = await request(app)
//     .get('/')
// });

// GET Create Game
test('Get Create Game', async () => {
  const gameName = 'waldo';
  const gameData = {game: gameName};
  const result = await request(app)
    .post('/new-game')
    .send(gameData)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  const parsedResult = JSON.parse(result.text);
  expect(parsedResult.date).toMatch(/Z/);
  expect(parsedResult.src).toMatch(/Temp String/);
  expect(parsedResult.game).toMatch(gameName);
})
