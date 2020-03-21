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
        if (err) return done(err);
        expect(res.text).to.include('Express');
        done();
      });
  });
});
