const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const User = require('../models/user');
const Poll = require('../models/poll');
const app = require('../app');
chai.use(chaiHttp);

describe('signup', () => {
  const signup = '/signup';
  const preSave = { email: 'yoyoyo@gmail.com', password: `11231123` , confirmPassword: `11231123` };

  it('signup get method should response 200 status', function (done) {
    chai
      .request(app)
      .get(signup)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      })
  });

  it('signup post method should response 200 status',function(done) {
    this.timeout(5000);
    chai
      .request(app)
      .post(signup)
      .send(preSave)
      .end(async (err, res) => {
        expect(res.status).to.equal(200);
        const user = await User.findOne({ email: preSave.email });
        await User.findByIdAndDelete(user.id);
        done();
      })
  });
});
