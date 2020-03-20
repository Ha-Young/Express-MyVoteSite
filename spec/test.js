const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const User = require('../models/User');
const Voting = require('../models/Voting');

// [index]
describe('GET /', function() {
  this.timeout(10000);
  it('should include respond with index template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Ongoing');
        expect(res.text).to.include('Completed');
        done();
      });
  });
});

describe('GET /my-votings', function() {
  this.timeout(10000);
  let sessionId = null;
  
  after(done => {
    request(app)
    .get('/users/logout')
    .set('Cookie', sessionId)
    .end(done);
  });
  
  it('should redirect "/users/login" if user is not loged in', done => {
    request(app)
    .get('/my-votings')
    .expect('Content-Type', /text/)
    .expect(302)
    .expect('Location', '/users/login')
    .end(done);
  });
  
  it('should get votes registered by logged-in user.', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'test@naver.com',
        password: 'Test1234!',
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/')
      .end((err, res) => {
        if (err) return done(err);
        sessionId = res.header['set-cookie'][0].split(';')[0];

        request(app)
          .get('/my-votings')
          .set('Cookie', sessionId)
          .expect('Content-Type', /html/)
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.include('좋아하는 계절은?');
            done();
          });
      });
  });
});

// [users]
describe('GET /users/login', function() {
  this.timeout(10000);
  it('should include respond with login template', done => {
    request(app)
      .get('/users/login')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Sign In');
        done();
      });
  });
});

describe('GET /users/logout', function() {
  this.timeout(10000);
  it('shold redirect "/users/login" after logout', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'test@naver.com',
        password: 'Test1234!',
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/')
      .end((err, res) => {
        if (err) return done(err);
        const sessionId = res.header['set-cookie'][0].split(';')[0];

        request(app)
          .get('/users/logout')
          .set('Cookie', sessionId)
          .expect('Content-Type', /text/)
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });
  });
});

describe('GET /users/new', function() {
  this.timeout(10000);
  it('should include respond with signup template', done => {
    request(app)
      .get('/users/new')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Sign Up');
        done();
      });
  });
});

describe('POST /users/new', function() {
  this.timeout(10000);
  after(async () => {
    await User.deleteOne({ email: 'testcode@naver.com' });
  });

  it('should add new user and redirect login page.', done => {
    request(app)
      .post('/users/new')
      .send({
        email: 'testcode@naver.com',
        password: 'Asdf1234!',
        passwordConfirmation: 'Asdf1234!'
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/users/login')
      .end(async (err, res) => {
        if (err) return done(err);
        const newUser = await User.findOne({ email: 'testcode@naver.com' });
        expect(newUser.email).to.eql('testcode@naver.com');
        done();
      });
  });

  it('should not add new user if inputed data is invalid(email format)', done => {
    request(app)
      .post('/users/new')
      .send({
        email: 'invalid.naver.com',
        password: 'Asdf1234!',
        passwordConfirmation: 'Asdf1234!'
      })
      .expect('Content-Type', /text/)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('Please fill it out in e-mail format.');
        const newUser = await User.findOne({ email: 'invalid.naver.com' });
        expect(newUser).to.eql(null);
        done();
      });
  });
});

// [voting]
describe('GET /votings/new', function() {
  this.timeout(10000);
  it('shold redirect "/users/login" if user is not loged in', done => {
    request(app)
      .get('/votings/new')
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/users/login')
      .end(done);
  });
});

describe('POST /votings/new', function() {
  this.timeout(20000);
  after(async () => {
    await Voting.deleteOne({ title: 'test code' });
  });

  it('should add new voting.', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'test@naver.com',
        password: 'Test1234!',
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/')
      .end(async (err, res) => {
        if (err) return done(err);
        const sessionId = res.header['set-cookie'][0].split(';')[0];
        const user = await User.findOne({ email: 'test@naver.com'});
        const userId = user._id.toString();

        request(app)
          .post('/votings/new')
          .set('Cookie', sessionId)
          .send({
            title: 'test code',
            made: userId,
            expiration_date: '2020/05/04',
            expiration_time: '15:00',
            options: ['option1', 'option2'],
          })
          .expect('Content-Type', /html/)
          .expect(201)
          .end(async (err, res) => {
            const newVoting = await Voting.findOne({ title: 'test code' });
            expect(newVoting.made.equals(user._id)).to.eql(true);
            done();
          });
      });
  });
});

describe('POST /votings/:id', function() {
  this.timeout(20000);
  after(async () => {
    await Voting.deleteOne({ title: 'test code' });
  });

  it('should update selected voting.', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'test@naver.com',
        password: 'Test1234!',
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/')
      .end(async (err, res) => {
        if (err) return done(err);
        const sessionId = res.header['set-cookie'][0].split(';')[0];
        const user = await User.findOne({ email: 'test@naver.com'});
        const userId = user._id.toString();

        request(app)
          .post('/votings/new')
          .set('Cookie', sessionId)
          .send({
            title: 'test code',
            made: userId,
            expiration_date: '2020/05/04',
            expiration_time: '15:00',
            options: ['option1', 'option2'],
          })
          .expect('Content-Type', /html/)
          .expect(201)
          .end(async (err, res) => {
            const newVoting = await Voting.findOne({ title: 'test code' });
            expect(newVoting.made.equals(user._id)).to.eql(true);

            request(app)
              .post(`/votings/${newVoting._id}`)
              .set('Cookie', sessionId)
              .send({ option: 'option1' })
              .expect('Content-Type', /html/)
              .expect(201)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Saved your choice! Thanks :)');
                done();
              });
          });
      });
  });
});


describe('Delete /votings/:id', function() {
  this.timeout(20000);
  it('should delete selected voting', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'test@naver.com',
        password: 'Test1234!',
      })
      .expect('Content-Type', /text/)
      .expect(302)
      .expect('Location', '/')
      .end(async (err, res) => {
        if (err) return done(err);
        const sessionId = res.header['set-cookie'][0].split(';')[0];
        const user = await User.findOne({ email: 'test@naver.com'});
        const userId = user._id.toString();

        request(app)
          .post('/votings/new')
          .set('Cookie', sessionId)
          .send({
            title: 'test code',
            made: userId,
            expiration_date: '2020/05/04',
            expiration_time: '15:00',
            options: ['option1', 'option2'],
          })
          .expect('Content-Type', /html/)
          .expect(201)
          .end(async (err, res) => {
            if (err) return done(err);
            const newVoting = await Voting.findOne({ title: 'test code' });
            expect(newVoting.made.equals(user._id)).to.eql(true);
            
            request(app)
              .delete(`/votings/${newVoting._id}`)
              .set('Cookie', sessionId)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.eql({ "delete": "ok" });
                done();
              });
          });
      });
  });
});
