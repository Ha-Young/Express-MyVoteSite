const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Voting = require('../models/Voting');

const mockdata = {
  username: 'a@naver.com',
  password: 123
};
describe('Get static files', () => {
  it('should be able to get static css file', done => {
    request(app)
      .get('/stylesheets/style.css')
      .expect('Content-Type', /css/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Arial');
        return done();
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
        return done();
      });
  });
});

describe('GET /login', function () {
  this.timeout(10000);
  it('should respond with login template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('로그인');
        return done();
      });
  });
});

describe('GET /votings/new', function () {
  this.timeout(10000);
  after(async () => {
    await Voting.deleteOne({ title: 'test' });
  });

  it('should go to the login page with querystring if user is not logged in', done => {
    request(app)
      .get('/votings/new')
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/login?continue=/votings/new')
      .end(done);
  });

  it('should add new voting after login', done => {
    request(app)
      .get('/login?continue=/votings/new')
      .send(mockdata)
      .end(async (err, res) => {
        if (err) return done(err);
        const sessionId = res.headers['set-cookie'][0].split(';')[0];
        const user = await User.findOne({ username: 'test@google.com' });

        return request(app)
          .get('/votings/new')
          .set('Cookie', sessionId)
          .send({
            title: 'test',
            endDate: '2020-03-31',
            endTime: '23:59',
            options: ['test1', 'test2']
          })
          .expect(302)
          .end(async () => {
            const newVoting = await Voting.findOne({ title: 'test' });
            expect(newVoting.createdBy.equals(user._id)).to.eql(true);
            done();
          });
      });
  });
});
