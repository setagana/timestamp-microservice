process.env.NODE_ENV = 'test';

const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../index');

const expect = chai.expect;

const UnprocessableEntity = require('../errors/UnprocessableEntity');

describe('Error constructors', () => {
  describe('Unprocessable Entity', () => {
    it('should create an object with properties - name, message, status', () => {
      const testError = new UnprocessableEntity();
      expect(testError).to.have.property('name');
      expect(testError).to.have.property('message');
      expect(testError).to.have.property('status');
    });
    it('should handle message passing as the first parameter', () => {
      const testString = 'Test string';
      const testError = new UnprocessableEntity(testString);
      expect(testError).to.have.property('message', testString);
    });
    it('should create an error with status 422', () => {
      const testError = new UnprocessableEntity();
      expect(testError).to.have.property('status', 422);
    });
  });
});

chai.use(chaiHttp);
describe('Server', () => {
  describe('/GET', () => {
    it('should respond to GET requests without further input', (done) => {
      const defaultMessage = 'Welcome to the API. To use, send a request with a string containing a date and (optional) time, e.g. /My+date+and+time+of+birth+was+01%2F01%2F1990+at+18%3A30.';
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', defaultMessage);
          done();
        });
    });

    it('should respond with a 422 error if no date can be read', (done) => {
      const reqInput = 'I contain no date.';
      chai.request(server)
        .get('/' + reqInput)
        .end((err, res) => {
          expect(res).to.have.status(422);
          done();
        });
    });

    it('should respond with a timestamp if input contains a date in format DD/MM/YYYY', (done) => {
      const reqInput = 'My date of birth was 01/01/1990.';
      chai.request(server)
        .get('/' + reqInput)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('timestamp', 631152000);
          done();
        });
    });
  });
});
