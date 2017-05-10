const defaultMessage = 'The requested string could not be processed - it does not contain a date in a supported format.';

module.exports = function UnprocessableEntity(message = defaultMessage) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message;
  this.status = 422;
};
