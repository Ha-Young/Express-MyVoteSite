const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');

describe('GET /', () => {
  it('"/" route에 "GET" 요청을 보내면 요청에 대해  정상적인 응답을 보내주어야 합니다. ', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('로그인을 하지 않은 상태에서 "/my-votings" route에 GET 요청을 보내면 "/login" route로 Redirect 되어야 합니다.', done => {
    request(app)
      .get('/my-votings')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('/login', () => {
  const bcrypt = require('bcrypt');
  const USER = require('../models/User');

  const mockUser = {
    name: 'TEST_USER',
    email: 'TEST_USER@TEST_USER',
    password: '12345678'
  };

  const fetchSaveUser = async () => {
    mockUser.hash = bcrypt.hashSync(mockUser.password, bcrypt.genSaltSync(10));
    await new USER(mockUser).save();
  };
  const fetchDeleteUser = async () => await USER.findOneAndDelete({ email: mockUser.email });

  beforeEach(fetchSaveUser);
  afterEach(fetchDeleteUser);

  it('사용자가 올바른 id와 password를 입력하면 로그인에 성공해야합니다.', done => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(302)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('password가 일치하지 않을 경우, error 템플릿을 렌더해주어야합니다.', done => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: mockUser.email, password: 'wrongPassword' })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.include('아이디 또는 비밀번호를 다시 한 번 확인해주세요.');
        done();
      });
  });
});
