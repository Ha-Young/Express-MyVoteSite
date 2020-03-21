const { expect } = require('chai');
const User = require('../models/user');
const Poll = require('../models/poll');
const app = require('../app');
const request = require('supertest');

describe('signup', function() {
  const signup = '/signup';
  const preSave = { 
    email: 'yoyoyo@gmail.com', 
    password: `11231123`, 
    confirmPassword: `11231123`,
  };

  const wrongEmail = { 
    email: 'yoyoyo@gmail.comdddddd', 
    password: `11231123`, 
    confirmPassword: `11231123`,
  };

  const wrongPassword = ({ 
    email: 'yoyoyo@gmail.com', 
    password: `1123112312313123131323`, 
    confirmPassword: `11231123`,
  })

  const wrongConfirmPassword = ({ 
    email: 'yoyoyo@gmail.com', 
    password: `11231123`, 
    confirmPassword: `1123112312313123131323`,
  })

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

  it('signup get method should response 200 status', function(done) {
    request(app)
      .get(signup)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('The pre email shoud be found in collection', function(done) {
    User.findOne({ email: preSave.email }, (err, user) => {
      expect(user.email).to.equal(preSave.email);
      done();
    });
  });

  it('The same email address should occur 409 error ', function(done) {
    request(app)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        expect(res.text).to.include('The email already exists');
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('The wrongEmail email address should occur 422 error ', function(done) {
    request(app)
      .post(signup)
      .send(wrongEmail)
      .end((err, res) => {
        expect(res.text).to.include('The email address is not acceptable');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('The wrong passworld should occur 422 error', function(done) {
    request(app)
      .post(signup)
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.text).to.include('The password is not acceptable');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('The wrong passworld should occur 422 error', function(done) {
    request(app)
      .post(signup)
      .send(wrongConfirmPassword)
      .end((err, res) => {
        expect(res.text).to.include('Please confirm your password');
        expect(res.status).to.equal(422);
        done();
      });
  });
});
