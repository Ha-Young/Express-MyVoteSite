const request = require("supertest");
const { expect, assert } = require("chai");
const sinon = require("sinon");
const app = require("../app");

describe("votingsController", () => {

  const mongoose = require("mongoose");
  const db = mongoose.connection;

  const Vote = require("../models/vote");

  describe("getAll votes", () => {
    it("should respond with JSON data", (done) => {
      request(app)
        .get("/")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.header['content-type'], 'text/html; charset=utf-8');

          done();
        });
    });

    it("should create a new vote", (done) => {
      request(app)
        .post("/")
        .send({
          title: "TEST",
          creater: { _id: "ID", nickname: "test" },
          expiredAt: "2021-04-05",
          convertedExpiredAt: "2021년 4월 5일",
          option: [{ text: "test1" }, { text: "test2" }],
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");

          done();
        });
    });

    xit("should get All votes", () => {
      const req = {};
      const res = { render: sinon.spy() };
    });
  });
});
