const http = require('http');
const chai = require('chai');
// const request = require('request');
const request = require('supertest');
const should = chai.should();
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = require('chai');
// const sinon = require('sinon');
// // const stub = sinon.stub();
// const spy = sinon.spy();
const app = require('../app');

chai.use(chaiHttp);

// describe('Users route', () => {
//   const signup = '/signup';
//   const preSave = { email: 'asdfvcd@gmail.com', password: `11231123` , confirmPassword: `11231123` };
//   it('signup page should response ok',(done) => {
//     chai
//       .request('http://localhost:4000')
//       .get(signup)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         done();
//       })
//   });

//   it('signup page should get response ok, and direct to http://localhost:4000', function(done){
//     this.timeout(5000)
//     chai
//       .request('http://localhost:4000')
//       .post(signup)
//       .send(preSave)
//       .end(function(err, res) {
//         // console.log(res)
//         expect(res.status).to.equal(200);
//         expect(res.redirects[0]).to.equal('http://localhost:4000/');
//         done();
//       })
//   });
// });



describe('GET /', () => {
  it('should respond with template', function(done) {
    this.timeout(10000)
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {

        if (err) return done(err);
        expect(res.text).to.include('잘까말까');
        done();
      });
  });
});
