const { assert } = require("chai");
const sinon = require("sinon");

const { AUTH_ROUTE, SIGNUP } = require("../constants");
const User = require("../models/User");
const authController = require("../routes/controllers/authController");

describe(">>> AUTH CONTROLLER --- EXPRESS", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("+++ POST /signup _ 성공", () => {
    const req = {
      body: {
        name: "name",
        email: "eamil@gmail.com",
        password: "1234",
        passwordConfirm: "1234",
      },
    };
    const res = {};
    const next = sinon.spy();
    const create = sinon.stub(User, "create");

    authController.signup(req, res, next);

    assert(create.calledWithExactly(req.body));
    assert(create.calledOnce);
    assert(!next.called);
  });

  it("+++ POST /signup _ 실패", () => {
    const req = {
      body: {
        name: "",
        email: "eamil@gmail.com",
        password: "1234",
        passwordConfirm: "1234",
      },
      flash: sinon.stub(),
    };
    const res = {
      redirect: sinon.stub(),
    };
    const next = sinon.spy();
    const create = sinon.stub(User, "create");

    authController.signup(req, res, next);

    assert(req.flash.calledWithExactly("message", "Provide all informations."));
    assert(req.flash.calledOnce);
    assert(res.redirect.calledOnce);
    assert(res.redirect.calledWithExactly(AUTH_ROUTE + SIGNUP));
    assert(!create.calledOnce);
    assert(!next.called);
  });
});
