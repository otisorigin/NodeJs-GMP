export default class HttpException extends Error {
  constructor(
    public message: string,
    public status: number = 500
  ) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
