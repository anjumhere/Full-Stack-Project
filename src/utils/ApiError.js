class ApiError extends Error {
  constructor(
    statuscode,
    message = 'Something went wrong',
    error = [],
    statch = '',
  ) {
    super(messaage);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
