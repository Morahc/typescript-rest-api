class HttpException extends Error {
  status: number;

  constructor(status: number, public readonly message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpException;
