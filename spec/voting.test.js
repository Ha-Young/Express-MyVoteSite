const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const mockData = {
  email: 'th05662205@gmail.com',
  password: 'aa'
};

describe('GET /auth', () => {
  describe('/login', () => {
    it('should respond with login template', done => {
      request(app)
        .get('/auth/login')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('Log in');
          done();
        });
    });
  });
});
