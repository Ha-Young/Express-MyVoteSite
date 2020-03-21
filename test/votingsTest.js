const { expect } = require('chai');
const User = require('../models/user');
const Poll = require('../models/poll');
const app = require('../app');
const request = require('supertest');

describe('votings', function() {
  describe('votings/new', function() {
    const signup = '/signup';
    const logIn = '/auth/login';
    const newVoting = '/votings/new';
    const authenticatedUser = request.agent(app);
    const preSave = { 
      email: 'yoyoyo@gmail.com', 
      password: `11231123`, 
      confirmPassword: `11231123`,
    };

    const wrongTopic = {
      topic: 'This is test file for wrong topic. The topic is too long ',
      date: '2020-04-01',
      time: '13:00',
      answer1: 'yes',
      answer2: 'no',
    }

    const wrongAnswer = {
      topic: '짬뽕 짜장면 둘중에 누구',
      date: '2020-04-01',
      time: '13:00',
      answer1: '몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라',
      answer2: '짜장면',
    }

    const invalidTime = {
      topic: '짜장면 짬뽕',
      date: '2013-04-01',
      time: '13:00',
      answer1: '짜장면',
      answer2: '짬뽕',
    }

    const correctOne = {
      topic: '짜장면 짬뽕',
      date: '2020-04-01',
      time: '13:00',
      answer1: '짜장면',
      answer2: '짬뽕',
    }

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
      User.findOneAndDelete({ email: preSave.email }).then(() => {
        Poll.findOneAndDelete({ topic: '짜장면 짬뽕' }, () => {
          done();
        });
      });
    });
  
    it('A logged in user should be able to create a new vote', function(done) {
      authenticatedUser
        .post(logIn)
        .send(preSave)
        .expect(302)
        .end((err, res) => {
          authenticatedUser
            .get(newVoting)
            .expect(200)
            .end((err, res) => {
              expect(res.text).to.include('Logout');
              expect(res.text).to.include('Topic');
              expect(res.text).to.include('ExpringDate');
              done();
            });
        });
    });
  
    it('A user who is not being looged in should should redirectd to login page', function(done) {
      request(app)       
        .get(newVoting)
        .expect(200)
        .expect('location', '/auth/login')
        .end((err, res) => {
          done();
        });
    });

    it('Invalid topic should occur 422 error', function(done) {
      authenticatedUser
        .post(logIn)
        .send(preSave)
        .expect(302)
        .end((err, res) => {
          authenticatedUser
            .post(newVoting)
            .send(wrongTopic)
            .expect(422)
            .end((err, res) => {
              expect(res.text).to.include('Topic is not acceptable');
              done();
            });
        });
    });

    it('Invalid answers should occur 422 error', function(done) {
      authenticatedUser
        .post(logIn)
        .send(preSave)
        .expect(302)
        .end((err, res) => {
          authenticatedUser
            .post(newVoting)
            .send(wrongAnswer)
            .expect(422)
            .end((err, res) => {
              expect(res.text).to.include('Answer is not acceptable');
              done();
            });
        });
    });

    it('Invalid(past) time with valid info should redirect failure page', function(done) {
      authenticatedUser
        .post(logIn)
        .send(preSave)
        .expect(302)
        .end((err, res) => {
          authenticatedUser
            .post(newVoting)
            .send(invalidTime)
            .expect(302)
            .end((err, res) => {
              expect(res.text).to.include('Redirecting to /votings/failure');
              done();
            });
        });
    });

    it('Invalid(past) time with valid info should redirect failure page', function(done) {
      this.timeout(5000);
      authenticatedUser
        .post(logIn)
        .send(preSave)
        .expect(302)
        .end((err, res) => {
          authenticatedUser
            .post(newVoting)
            .send(correctOne)
            .expect(200)
            .end(async(err, res) => {
              const poll = await Poll.findOne({ topic: '짜장면 짬뽕' });
              expect(poll.topic).to.equal('짜장면 짬뽕')
              done();
            });
        });
    });
  });
});
