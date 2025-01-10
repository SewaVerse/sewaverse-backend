type HttpCode = 400 | 404 | 500 | 401;

class ApiError extends Error {
  code: HttpCode;

  constructor(message: string, code?: HttpCode) {
    super(message);
    this.code = code ?? 400;
    this.name = this.constructor.name;
  }
}

export default ApiError;
