class CustomError extends Error {
  code: number;
  data: Record<string, unknown>;

  constructor(
    message: string,
    code: number,
    data: Record<string, unknown> = {}
  ) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      data: this.data,
      stack: this.stack,
    };
  }
}

export default CustomError;
