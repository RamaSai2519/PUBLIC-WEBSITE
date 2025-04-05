export interface BaseApiErrorResponse {
  message?: string;
}

export interface BaseApiResponse<T> {
  data: T;
  success: boolean;
  error?: BaseApiErrorResponse;
  cancelled?: boolean;
}
