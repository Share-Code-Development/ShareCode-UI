export interface IQueryListParams {
    skip?: number;
    take?: number;
    orderBy?: string;
    order?: string;  
    searchQuery?: string;
}

export interface IListResponse<T> {
    entities: T[];
    totalCount: number;
    query: IQueryListParams;
}