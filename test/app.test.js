const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const Votes = require("../models/Votes");

chai.should();
chai.use(chaiHttp);

describe("root route", () => {
  it("should respond with status code 200 with no query parameters.", async () => {
    const allVotes = await Votes.find().lean();

    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type");
        res.header["content-type"].should.be.equal("text/html; charset=utf-8");

        const areVotesIncluded = allVotes.filter(vote => res.text.includes(vote.title));
        areVotesIncluded.should.have.lengthOf(allVotes.length);

        res.text.includes("회원가입");
        res.text.includes("로그인");
      });
  });
});
