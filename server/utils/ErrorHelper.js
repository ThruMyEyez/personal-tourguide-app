class ErrorResponse extends Error {
  constructor(message, status, errorName) {
    super(message);
    this.status = status;
    this.name = errorName;
  }
}

const modelValidationErrorHelper = (error, status) => {
  if (error.name === 'ValidationError') {
    const { errors } = error;
    Object.keys(errors).forEach((key) => {
      errors[key] = errors[key].message;
      error.status = status || 400;
    });
  }
};

module.exports = { ErrorResponse, modelValidationErrorHelper };
