const request = require('supertest');
const indexRouter = require('../routes/index.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false })); // Not sure what this does
app.use(express.json());                          // This is needed to accept JSON requests
app.use(cors());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  secret: process.env.sessionSecret,
  maxAge: 1000 * 60 * 60 * 4                      // 4 hour session
}));

app.use('/', indexRouter);

//// ------ MongoDB Stuff ------ ////

// GET Index
// test('Test GET index', async () => {
//   const result = await request(app)
//     .get('/')
// });

// GET /easy: no query
test("Create 'easy' game", async () => {
  const result = await request(app)
    .get('/easy')
    .expect('Content-Type', /json/)
    .expect(200)

  const parsedResult = JSON.parse(result.text);
  expect(parsedResult.location).toBeNull();
  expect(parsedResult.success).toBeFalsy();
  expect(parsedResult.win).toBeFalsy();
});
