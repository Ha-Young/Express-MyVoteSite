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

  describe('/logout', () => {
    it('should log out', done => {
      request(app)
        .get('/auth/logout')
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.eql('Found. Redirecting to /');
          done();
        });
    });
  });
});

describe('POST /auth', () => {
  describe('/login', () => {
    it('should log in', done => {
      request(app)
        .post('/auth/login')
        .send(mockData)
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.eql('Found. Redirecting to /');
          done();
        });
    });

    it('should show error message when non-existent email is entered', done => {
      mockData.email = 'aasd23@adasd.ada';

      request(app)
        .post('/auth/login')
        .send(mockData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('존재하지 않는 유저입니다.');
          done();
        });
    });

    it('should show error message when incorrect password is entered', done => {
      mockData.email = 'th05662205@gmail.com';
      mockData.password = 'asdasd';

      request(app)
        .post('/auth/login')
        .send(mockData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('비밀번호가 일치하지 않습니다');
          done();
        });
    });
  });
});
