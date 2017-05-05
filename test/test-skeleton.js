process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const chaiDOM = require('chai-dom');
const Nightmare = require('nightmare');
const bcrypt = require('bcryptjs');

const server = require('../server');
const models = require('../models');


const should = chai.should();
chai.use(chaiHTTP);
chai.use(chaiDOM);

const myNightmare = function(evaluate) {
  Nightmare()
    .goto('localhost:5000')
    .evaluate(evaluate);
}

describe('Some kind of test suite', function() {
	beforeEach('clear and add', function(done) {

	  var newUser = {
	    email: 'susan@example.com',
	    password: bcrypt.hashSync("fakepassword123", bcrypt.genSaltSync(10))
	  }

	  var susansId;

	  models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
	    .then(function(){
	      models.sequelize.options.maxConcurrentQueries = 1;
	      return models.sequelize.sync({ force: true });
	    })
	    .then(function(){
	      return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
	    })
	    .then(function() {
	      return models.User
	        .create(newUser);
	    })
	    .then(function(data) {
	      susansId = data.dataValues.id;
	    })
	    .then(function(data) {
	      return models.Context
	        .bulkCreate([{
	          name: 'Home',
	          UserId: susansId
	        }, {
	          name: 'Work',
	          UserId: susansId
	        }, {
	          name: 'Phone',
	          UserId: susansId
	        }, {
	          name: 'Computer',
	          UserId: susansId
	        }])
	    })
	    .then(function(data) {
	      done();
	    })
	    .catch(function(error) {
	      console.log('table sync error');
	      throw error;
	      done();
	    });
	});

	it('should do or not do something', function(done) {
		chai.request(server)
    .get('/')
    .end(function(err, res) {
      console.log(res);
      res.should.have.status(200);
      res.should.be.html;
      const toEvaluate = function() {
        document.querySelector('#some-element').should.have.text("some element's text");
      }
      myNightmare(toEvaluate);
      done();
	});
});
