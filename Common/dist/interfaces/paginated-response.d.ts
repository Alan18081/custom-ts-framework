export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    itemsPerPage: number;
    page: number;
}
