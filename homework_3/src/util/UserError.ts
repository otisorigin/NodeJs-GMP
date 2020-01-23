class UserError extends Error {
    constructor(
        public message: string = "Can't find user",
        public httpStatusCode: number = 204,
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