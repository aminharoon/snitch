class ApiResponse {
  statusCode;
  success;
  message;
  data;

  constructor(
    statusCode,
    message = "success",
    data,
    success = true,
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
