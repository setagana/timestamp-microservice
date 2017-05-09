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
          expect(res.body).to.have.property(timestamp).eql(631152000);
          done();
        });
    });
  });
});
