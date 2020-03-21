const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const User = require('../models/user');
const Poll = require('../models/poll');
const app = require('../app');
chai.use(chaiHttp);

describe('signup', () => {
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

  const url = 'http://localhost:4000';
  before(function(done) {
    this.timeout(10000);
    chai
      .request(app)
      .post(signup)
      .send(preSave)
      .end(async (err, res) => {
        done();
      });
  });

  after(function(done) {
    User.findOneAndDelete({ email: preSave.email }, (err, user) => {
      done();
    });
  });

  it('signup get method should response 200 status', function(done) {
    chai
      .request(app)
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
    chai
      .request(url)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        expect(res.text).to.include('The email already exists');
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('The wrongEmail email address should occur 422 error ', function(done) {
    chai
      .request(url)
      .post(signup)
      .send(wrongEmail)
      .end((err, res) => {
        expect(res.text).to.include('The email address is not acceptable');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('The wrong passworld should occur 422 error', function(done) {
    chai
      .request(url)
      .post(signup)
      .send(wrongPassword)
      .end(async (err, res) => {
        expect(res.text).to.include('The password is not acceptable');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('The wrong passworld should occur 422 error', function(done) {
    chai
      .request(url)
      .post(signup)
      .send(wrongConfirmPassword)
      .end(async (err, res) => {
        expect(res.text).to.include('Please confirm your password');
        expect(res.status).to.equal(422);
        done();
      });
  });
});
