import request from 'supertest';
import { expect } from 'chai';
import app from '../app';
import User from '../models/user';

describe('GET /', () => {
  it('should respond with template', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.include('진행중인 투표' && '만료된 투표');
        done();
      });
  });
});

describe('GET static assets', () => {
  it('should be able to get static reset css file', () => {
    request(app)
      .get('/stylesheets/reset.css')
      .expect('Content-Type', /css/)
      .expect(200);
  });

  it('should be able to get static style css file', () => {
    request(app)
      .get('/stylesheets/styles.css')
      .expect('Content-Type', /css/)
      .expect(200);
  });

  it('should be able to get static js file', () => {
    request(app)
      .get('/javascripts/main.js')
      .expect('Content-Type', /javascript/)
      .expect(200);
  });
});

describe('POST /login', () => {
  it('should redirect to / when success login', (done) => {
    const email = 'inyeop0212@gmail.com';
    const password = 'qwerqwer';

    request(app)
      .post('/login')
      .send({ email, password })
      .expect(302)
      .expect('Location', '/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  it('should redirect to /login when fail login', (done) => {
    const email = 'inyeop0212@gmail.com';
    const WRONG_PASSWORD = 'WRONG_PASSWORD';

    request(app)
      .post('/login')
      .send({ email, password: WRONG_PASSWORD })
      .expect(302)
      .expect('Location', '/login')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

describe('POST /signup', () => {
  it('should create new user when submited signup successfully', (done) => {
    const username = 'username';
    const email = 'user@user.com';
    const password = 'password';

    request(app)
      .post('/signup')
      .send({
        username,
        email,
        password,
        confirmPassword: password
      })
      .expect(302)
      .expect('Location', '/login')
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        const user = await User.findOneAndDelete({ username, email });

        expect(user).to.include({ username, email });
        return done();
      });
  });
});
