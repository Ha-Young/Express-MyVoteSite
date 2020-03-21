const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../models/User');
const Voting = require('../models/Voting');

describe('Get static files', function() {
  it('should be able to get static css file', done => {
    request(app)
      .get('/stylesheets/style.css')
      .expect('Content-Type', /css/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Arial');
        done();
      });
  });

  it('should be able to get static js file', done => {
    request(app)
      .get('/javascripts/newVoting.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('const form = document.forms[0];');
        done();
      });
  })
})

describe('GET /login', function() {
  this.timeout(10000);
  it('should respond with login template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('로그인');
        done();
      });
  });
});

describe('GET /votings/new', function() {
  this.timeout(10000);

  it('should go to the login page with querystring if user is not logged in.', done => {
    request(app)
      .get('/votings/new')
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/login?continue=/votings/new')
      .end(done);
  });
});
