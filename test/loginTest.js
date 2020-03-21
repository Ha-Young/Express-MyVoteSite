const { expect } = require('chai');
const User = require('../models/user');
const Poll = require('../models/poll');
const app = require('../app');
const request = require('supertest');

describe('index', function() {
  const signup = '/signup';
  const logIn = '/auth/login';
  const preSave = { 
    email: 'yoyoyo@gmail.com', 
    password: `11231123`, 
    confirmPassword: `11231123`,
  };

  before(function(done) {
    this.timeout(10000);
    request(app)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        done();
      });
  });

  after(function(done) {
    User.findOneAndDelete({ email: preSave.email }, (err, user) => {
      done();
    });
  });

  it('login get method should response 200 status', function(done) {
    request(app)
      .get(logIn)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  it('The wrong email address response 404 status', function(done) {
    request(app)
      .post(logIn)
      .send(wrongEmail)
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.include('The user does not exist');
        done();
      });
  });

  it('The wrong password response 401 status', function(done) {
    request(app)
      .post(logIn)
      .send(wrongPassword)
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.include('You have entered an invalid password');
        done();
      });
  });
  const authenticatedUser = request.agent(app);

  it('A user should be redirect to index when user entered valid information,', function(done) {
    authenticatedUser
      .post(logIn)
      .send(preSave)
      .expect(302)
      .end((err, res) => {
        authenticatedUser
          .get('/')
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.include('Logout');
            done();
          });
      });
  });
});
