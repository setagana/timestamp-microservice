module.exports = function UnprocessableEntity(
  message = 'The requested string could not be processed - it does not contain a date in a supported format.',
  errorCode = 422) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message;
  this.statusCode = 422;
  this.errorCode = errorCode;
}
