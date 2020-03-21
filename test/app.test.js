const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('root route', () => {
  // afterEach(() => {
  //   app.close();
  // });

  it('should respond with status code 200 with no query parameters.', done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.to.have.status(200);
        res.

        done();
      });
  });
});

