class HttpException extends Error {
  status: number;
  // add name to error object

  constructor(status: number, public readonly message: string, name?: string) {
    super(message);
    this.status = status;
    this.name = name || 'Error';
  }
}

export default HttpException;
