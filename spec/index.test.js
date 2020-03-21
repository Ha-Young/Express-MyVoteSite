const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const mockData = {
  email: 'th05662205@gmail.com',
  password: 'aa'
};

describe('GET /index', () => {
  describe('/', () => {
    it('should respond with index template', function(done) {
      this.timeout(5000);
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('Votings');
          done();
        });
    });
  });

  describe('/my-votings', () => {
    it('should redirect with login template before log in', done => {
      request(app)
        .get('/my-votings')
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.eql('Found. Redirecting to /auth/login');
          done();
        });
    });
  });
});
