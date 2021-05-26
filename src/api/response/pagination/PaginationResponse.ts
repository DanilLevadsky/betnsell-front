export class PaginationResponse<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  content: T;
}
