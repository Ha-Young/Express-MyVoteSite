const http = require('http');
const expect = require('chai').expect;

const Passport = require('passport').Passport;

describe('prototype', function() {
  const req = new http.IncomingMessage();

  it('should be extended with login', function() {
    expect(req.login).to.be.an('function');
  });

  it('should be extended with logout', function() {
    xpect(req.logout).to.be.an('function');
  });
});

describe('#login', function() {
  describe('not establishing a session', function() {
    const passport = new Passport;
    const req = new http.IncomingMessage();
    req._passport = {};
    req._passport.instance = passport;
    req._passport.session = {};

    let error;
    // console.log(req)
    before(function(done) {
      const user = { id: '1', username: 'root' };
      req.login(user, { session: false }, function(err) {
        error = err;
        console.log(req);
        done();
      });
    });

    it('should not error', function() {
      expect(error).to.be.undefined;
    });
  });
});
