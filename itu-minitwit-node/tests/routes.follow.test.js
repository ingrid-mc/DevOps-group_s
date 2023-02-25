const request = require('supertest');
const express = require('express');
const session = require('express-session');
const router = require('../src/routes/follow');

const app = express();

// Set up session middleware for testing
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

app.use(router);

// Define the mockSession function in the global scope
global.mockSession = async (sessionData) => {
    const mockSession = {
      passport: {
        user: sessionData.user
      }
    };
  
    const encodedSession = Buffer.from(JSON.stringify(mockSession)).toString('base64');
    return [`connect.sid=s%3A${encodedSession}`];
  };
  

// Test that a user can follow another user successfully
test('User can follow another user', async () => {
  const username = 'testuser';

  // Mock the database query to return a single user
  const dbQueryMock = jest.fn((query, params, callback) => {
    callback(null, [{user_id: 1, username}]);
  });

  // Override the database service with the mock
  jest.mock('../src/db/dbService', () => {
    const dbQueryMock = jest.fn();
    return {
      all: dbQueryMock
    };
  });

  // mock user in session
  const mockUser = { username: 'testuser', user_id: 1 };
  const sessionData = { user: mockUser };
  const sessionCookie = await global.mockSession(sessionData);
  
  const res = await request(app)
    .get(`/${username}`)
    .set('Cookie', sessionCookie);

  expect(res.status).toBe(302);
  expect(res.header['location']).toBe(`/api/${username}`);

});

// Test that a non-logged-in user cannot follow another user
test('Non-logged-in user cannot follow another user', async () => {
  const username = 'testuser';

  // Mock the database query to return a single user
  const dbQueryMock = jest.fn((query, params, callback) => {
    callback(null, [{user_id: 1, username}]);
  });

  // Override the database service with the mock
  jest.mock('../src/db/dbService', () => {
    const dbQueryMock = jest.fn();
    return {
      all: dbQueryMock
    };
  });
  
  const res = await request(app)
    .get(`/${username}`);

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('You must be logged in to follow.');
});

// Test that an error is returned if the user to be followed does not exist
test('Error is returned if user to be followed does not exist', async () => {
  const username = 'testuser';

  // Mock the database query to return an empty result set
  const dbQueryMock = jest.fn((query, params, callback) => {
    callback(null, []);
  });

  // Override the database service with the mock
  jest.mock('../src/db/dbService', () => {
    const dbQueryMock = jest.fn();
    return {
      all: dbQueryMock
    };
  });

  // mock user in session
  const mockUser = { username: 'testuser', user_id: 1 };
  const sessionData = { user: mockUser };
  const sessionCookie = await global.mockSession(sessionData);
  
  const res = await request(app)
    .get(`/${username}`)
    .set('Cookie', sessionCookie);

  expect(res.status).toBe(400);
  expect(res.body.error).toBe(`User ${username} not found.`);
});
