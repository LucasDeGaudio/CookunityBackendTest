export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  data: { [key: string]: any };
}

export interface ApiErrorResponse {
  statusCode: number;
  statusMessage: string;
  errorMessage: string;
  data?: { [key: string]: any };
}
