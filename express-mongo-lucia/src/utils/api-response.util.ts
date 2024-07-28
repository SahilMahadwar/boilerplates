class APIResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;

  constructor(code: number, data: T, message = "success") {
    this.success = code < 400;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export { APIResponse };
