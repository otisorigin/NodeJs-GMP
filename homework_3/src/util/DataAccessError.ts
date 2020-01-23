export default class DataAccessError extends Error {
  constructor(
    public message: string,
    public httpStatusCode: number = 500,
    ...params: any
  ) {
    super(...params);
    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
