const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const Votes = require("../models/Votes");

chai.should();
chai.use(chaiHttp);

describe("[GET], /login", () => {
  it("should respond with status code 200 with no query parameters.", done => {
    chai
      .request(app)
      .get("/auth/login")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        res.header["content-type"].should.be.equal("text/html; charset=utf-8");
        res.text.includes("Login").should.be.true;

        done();
      });
  });
});

describe("[POST], /login", () => {
  it("should redirect to root route when correct email address and password is submitted.", async () => {
    const allVotes = await Votes.find().lean();

    chai
      .request(app)
      .post("/auth/login")
      .send({ email: "dhs0113@gmail.com", password: "ehgusthf1234" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        res.header["content-type"].should.be.equal("text/html; charset=utf-8");

        const areVotesIncluded = allVotes.filter(vote => res.text.includes(vote.title));
        areVotesIncluded.should.have.lengthOf(allVotes.length);

        res.text.includes("회원가입").should.be.true;
        res.text.includes("로그인").should.be.true;
      });
  });

  it("should reload login page with error message when email address and password is invalid.", () => {
    chai
      .request(app)
      .post("/auth/login")
      .send({ email: "some address", password: "ehgusthf1234" })
      .end((err, res) => {
        res.redirects[0].should.includes("/auth/login");
        res.text.includes("Login").should.be.true;
      });
  });
});
