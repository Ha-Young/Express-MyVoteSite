import request from 'supertest';
import { expect } from 'chai';
import app from '../app';

describe('GET /', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.include('진행중인 투표' && '만료된 투표');
        done();
      });
  });
});

describe('GET static assets', () => {
  it('should be able to get static reset css file', () => {
    request(app)
      .get('/stylesheets/reset.css')
      .expect('Content-Type', /css/)
      .expect(200);
  });

  it('should be able to get static style css file', () => {
    request(app)
      .get('/stylesheets/styles.css')
      .expect('Content-Type', /css/)
      .expect(200);
  });

  it('should be able to get static js file', () => {
    request(app)
      .get('/javascripts/main.js')
      .expect('Content-Type', /javascript/)
      .expect(200);
  });
});
