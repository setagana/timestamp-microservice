process.env.NODE_ENV = 'test';

const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);
describe('Server', () => {
  describe('/GET', () => {
    it('should respond to GET requests', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should respond with a 422 error if no date can be read', (done) => {
      let reqInput = 'I contain no date.';
      chai.request(server)
        .get('/' + reqInput)
        .end((err, res) => {
          expect(res).to.have.status(422);
          done();
        });
    });
  });
});
