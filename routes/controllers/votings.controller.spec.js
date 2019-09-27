// const sinon = require('sinon');
// const sinonTest = require('sinon-test')(sinon);
// const ObjectId = require('mongoose').Types.ObjectId;

// const User = require('../../models/User');
// const Vote = require('../../models/Vote');
// const {getAllVoteInfo} = require('./votings.controllers');

// describe('Index Controller', function () {
//   let req= {
//     user : {
//       _id : ObjectId("5d8b727ec4993e4597e0339b"),
//       name: 'qwe',
//       password: 'qwe'
//     },
//     params:{
//       id : ObjectId('5d8b74ce679e3845ac87a761')
//     }
//   };
//   let error = new Error({ error: 'error' });
//   let res = {};
//   let expectedResult;

//   describe('getProblemList', function () {
//     beforeEach(function () {
//       res = {
//         render: sinon.spy(),
//         status: sinon.stub().returns({ end: sinon.spy() }),
//       };
//       expectedResult = [{}, {}];

//     });
//     console.log(req);
//     it('should return loaded problem list', sinonTest(function () {
//       this.stub(User, 'findOne').yields(null, expectedResult);
//       this.stub(Vote, 'find').yields(null, expectedResult);
//       // console.log(expectedResult);
//       getAllVoteInfo(req, res);
//       console.log(req)
//       console.log(res);
//       sinon.assert.calledWith(Vote.getAllVoteInfo, req.body);
//       // sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
//     }));
//   });
// });

// // Controller.create(req, res);
// //             sinon.assert.calledWith(Vehicle.create, req.body);
// //             sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
// //             sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));



const assert = require('assert');

describe('Simple test suite:', function() {
    it('1 === 1 should be true', function() {
        assert(1 === 1);
    });
});