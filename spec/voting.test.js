const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Voting = require('../models/Voting');
const User = require('../models/User');

const mockData = {
  email: 'th05662205@gmail.com',
  password: 'aa'
};
let Cookies;
let mockVotingData;
let mockUser;

describe('GET /votings', () => {
  before(done => {
    request(app)
      .post('/auth/login')
      .send(mockData)
      .expect(302)
      .end(async (err, res) => {
        if (err) return done(err);
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        mockUser = await User.findOne({ email: mockData.email });

        await Voting({
          user: mockUser._id,
          title: 'test',
          options: [
            { option_title: 'test1', option_count: 0 },
            { option_title: 'test2', option_count: 0 }
          ],
          deadline: new Date('2023-02-03 14:01').getTime()
        }).save();
        mockVotingData = await Voting.findOne({ title: 'test' });
        done();
      });
  });

  after(async () => {
    await Voting.findByIdAndDelete(mockVotingData._id);
  });

  describe('/new', () => {
    it('should respond with voting creation template', done => {
      request(app)
        .get('/votings/new')
        .set('Cookie', [Cookies])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('투표 생성');
          done();
        });
    });
  });

  describe('/:id', () => {
    it('should respond with voting detail', done => {
      request(app)
        .get(`/votings/${mockVotingData._id}`)
        .set('Cookie', [Cookies])
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('test');
          expect(res.text).to.include('투표하기');
          done();
        });
    });
  });
});
