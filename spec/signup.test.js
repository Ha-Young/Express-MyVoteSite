const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');

const mockData = {
  email: 'test@test.com',
  nickname: 'test',
  password: 'test',
  confirm: 'test'
};

describe('GET /signup', () => {
  it('should respond with signup template', done => {
    request(app)
      .get('/signup')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Sign Up');
        done();
      });
  });
});

describe('POST /signup', () => {
  after(async () => {
    await User.findOneAndDelete({ nickname: 'test' });
  });

  it('should be able to sign up', done => {
    request(app)
      .post('/signup')
      .send(mockData)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.eql('Found. Redirecting to /auth/login');
        done();
      });
  });

  it('should not allow duplicate emails', done => {
    request(app)
      .post('/signup')
      .send(mockData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('이미 존재하는 이메일입니다..');
        done();
      });
  });

  it('should not allow duplicate nicknames', done => {
    mockData.email = 'test2@test.com';

    request(app)
      .post('/signup')
      .send(mockData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('이미 존재하는 닉네임입니다..');
        done();
      });
  });

  it('should be same password', done => {
    mockData.email = 'test3@test.com';
    mockData.nickname = 'test3';
    mockData.confirm = '123';

    request(app)
      .post('/signup')
      .send(mockData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('비밀번호가 일치하지 않습니다..');
        done();
      });
  });
});
