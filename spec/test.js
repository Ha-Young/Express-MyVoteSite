const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');

describe('GET static assets', () => {
  it('should be able to get static css file', done => {
    request(app)
      .get('/stylesheets/style.css')
      .expect('Content-Type', /css/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should be able to get static js file', done => {
    request(app)
      .get('/javascripts/index.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /signup', () => {
  it('should respond with template', done => {
    request(app)
      .get('/signup')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /signup', () => {
  it('should respond with success template', done => {
    request(app)
      .post('/signup')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
