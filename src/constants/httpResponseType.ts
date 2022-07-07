export interface IHttpResponse {
  success: boolean;
  totalPages?: number | null;
  page?: number;
  results: Array<any> | null;
  error?: string | null;
}
