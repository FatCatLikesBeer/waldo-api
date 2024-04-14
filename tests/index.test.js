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
  const req = await request(app)
    .get('/easy')
    .expect('Content-Type', /json/)
    .expect(200)

  const result = JSON.parse(req.text);
  expect(result.location).toBeNull();
  expect(result.success).toBeFalsy();
  expect(result.win).toBeFalsy();
});

// GET /easy: new game & query
test("Create 'easy' game and one location", async () => {
  const initialGet = await request(app)
    .get('/easy')
    .expect('Content-Type', /json/)
    .expect(200)

  const cookie = initialGet.headers['set-cookie'];

  const response = await request(app)
    .get('/easy?name=first&locX=0&locY=0')
    .set('Cookie', cookie)
    .expect('Content-Type', /json/)
    .expect(200)

  const result = JSON.parse(response.text);
  expect(result.location).toBe("first");
  expect(result.success).toBeFalsy();
  expect(result.win).toBeFalsy();
  expect(result.time).toBeNull();
});

// GET /easy: & win game
test("Create 'easy' game and win it", async () => {
  const easy = {
    "first" : [247,9],
    "second":[487,11],
    "third":[40,334]
  };
  const initialGet = await request(app)
    .get('/easy')
    .expect('Content-Type', /json/)
    .expect(200)

  let cookie = initialGet.headers['set-cookie'];

  const first = await request(app)
    .get(`/easy?name=first&locX=${easy.first[0]}&locY=${easy.first[1]}`)
    .set('Cookie', cookie)
    .expect('Content-Type', /json/)
    .expect(200)

  cookie = first.headers['set-cookie'];

  const second = await request(app)
    .get(`/easy?name=second&locX=${easy.second[0]}&locY=${easy.second[1]}`)
    .set('Cookie', cookie)
    .expect('Content-Type', /json/)
    .expect(200)

  cookie = second.headers['set-cookie'];

  const third = await request(app)
    .get(`/easy?name=third&locX=${easy.third[0]}&locY=${easy.third[1]}`)
    .set('Cookie', cookie)
    .expect('Content-Type', /json/)
    .expect(200)

  const result = JSON.parse(third.text);
  expect(result.location).toBe("third");
  expect(result.success).toBeTruthy();
  expect(result.win).toBeTruthy();
  expect(result.time).toBeGreaterThan(0);
});

