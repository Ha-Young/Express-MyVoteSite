const request = require('supertest');
const { expect, assert } = require('chai');
const sinon = require('sinon');
const mockDB = require('./mockDB');
const app = require('../app');

describe('votingsController', () => {
  // beforeEach(async () => await mockDB.connect());

  describe('GET /votings/new', () => {
    it('should respond with JSON data', (done) => {
      request(app)
        .get('/votings/new')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.header['content-type'], 'text/html; charset=utf-8');

          done();
        });
    });
  });

  describe('POST /votings/new', () => {
    const data = JSON.stringify({
      title: 'TEST',
      creater: { _id: 'ID', nickname: 'test' },
      expiredAt: '2021-04-05',
      convertedExpiredAt: '2021년 4월 5일',
      option: [{ text: 'test1' }, { text: 'test2' }],
    });

    it('should create new vote', (done) => {
      request(app)
        .post('/votings/new')
        .set('Content-Type', 'multipart/form-data')
        .send(data)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body);
          done();
        });
    });
  });
});
