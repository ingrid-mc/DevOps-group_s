const assert = require('chai').assert;
const request = require('supertest');
//import db service
const app = require('../app'); // your Express app
const { Database } = require('sqlite3');
const fs = require('fs');
var path = require('path');
const temp = require('temp').track(); // package to create temporary files


describe('MiniTwit Tests', function() {

  let db;

  beforeEach(function(done) {
    // Before each test, set up a blank database
    const database = new Database("/Dbtest/minitwit.db");
    const schema = fs.readFileSync(path.join(__dirname, '../src/db/schema.sql'), 'utf-8');

      console.log('Created database schema');
    });

    done();
  });
  

  afterEach(function(done) {
    db.close();
    done(); // close database connection
  });

  // helper functions

  function register(username, password, password2=null, email=null) {
    // Helper function to register a user
    if (!password2) password2 = password;
    if (!email) email = username + '@example.com';
    return request(app)
      .post('/register')
      .send({
        'username': username,
        'password': password,
        'password2': password2,
        'email': email
      })
      .expect(302); // expect redirect
  }

  function login(username, password) {
    // Helper function to login
    return request(app)
      .post('/login')
      .send({
        'username': username,
        'password': password
      })
      .expect(302); // expect redirect
  }

  function registerAndLogin(username, password) {
    // Registers and logs in in one go
    return register(username, password)
      .then(() => login(username, password));
  }

  function logout() {
    // Helper function to logout
    return request(app)
      .get('/logout')
      .expect(302); // expect redirect
  }

  function addMessage(text) {
    // Records a message
    return request(app)
      .post('/add_message')
      .send({'text': text})
      .expect(302); // expect redirect
  }

  // testing functions

  it('should register', function() {
    // Make sure registering works
    return register('user1', 'default')
      .expect(302) // expect redirect
      .then((response) => {
        assert.include(response.text, 'You were successfully registered');
          
        return register('user1', 'default')
          .expect(200) // expect no redirect, since registration failed
          .then(response => {
            assert.include(response.text, 'The username is already taken');
            return register('', 'default')
              .expect(200)
              .then(response => assert.include(response.text, 'You have to enter a username'))
              .then(() => register('meh', ''))
              .then(response => assert.include(response.text, 'You have to enter a password'))
              .then(() => register('meh', 'x', 'y'))
              .then(response => assert.include(response.text, 'The two passwords do not match'))
              .then(() => register('meh', 'foo', 'foo@example.com'))
              .then(response => assert.include(response.text, 'You were successfully registered'))
              .then(() => register('meh', 'foo', 'foo@example.com'))
              .then(response => assert.include(response.text, 'The username is already taken'));
          });
      });
  });

  it('should log in and log out', function() {
    // Make sure logging in and logging out works
    return registerAndLogin('user1', 'default')
      .expect(302) // expect redirect
      .then((response) => {
        assert.include(response.text, 'You were logged in');
      });
  });
  

