export abstract class CustomError extends Error{
  abstract statusCode: number;

  constructor(message: string){
    super(message);

    // Only because of extends a build-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {message: string; field?: string}[]
}
