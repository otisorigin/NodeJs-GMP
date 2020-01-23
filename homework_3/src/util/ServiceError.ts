export default class ServiceError extends Error {
  constructor(
    public message: string,
    public httpStatusCode: number = 204,
    ...params: any
  ) {
    super(...params);
    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
