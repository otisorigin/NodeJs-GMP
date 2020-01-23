class SequelizeError extends Error {
  constructor(
    public message: string,
    public httpStatusCode: number = 500,
    ...params: any
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SequelizeError);
    }

    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
