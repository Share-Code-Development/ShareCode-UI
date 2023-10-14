export interface IQueryListParams {
    skip?: number;
    limit?: number;
    sort?: string;
    order?: string;  
    search?: string;
}

export interface IListResponse {
    result: any[];
    totalItems: number;
}