const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("auth route", () => {
  it("should respond with status code 200 with no query parameters.", function (done) {
    this.timeout(3000);

    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        res.header["content-type"].should.be.equal("text/html; charset=utf-8");
        
      });
  });
});