import { IQueryListParams } from "../models/queryList.model";
import { ConfigService } from "../services/config.service";

export class QueryListParams implements IQueryListParams {
    public skip: number
    public take: number;
    public orderBy: string;
    public order: string;
    public searchQuery: string;

    private initialQuery?: IQueryListParams;

    constructor(queryList?: IQueryListParams) {
        this.skip = queryList?.skip || 0;
        this.take = queryList?.take || ConfigService.defaultQueryLimit;
        this.orderBy = queryList?.orderBy || '';
        this.order = queryList?.order || '';
        this.searchQuery = queryList?.searchQuery || '';
        this.initialQuery = queryList;
    }

    public getQuery() {
        const query: IQueryListParams = {
            skip: this.skip,
            take: this.take,
            orderBy: this.orderBy,
            order: this.order,
            searchQuery: this.searchQuery
        }
        // remove falsy values
        Object.keys(query).forEach((key) => (!query[key as keyof IQueryListParams] && typeof query[key as keyof IQueryListParams] !== 'number') && delete query[key as keyof IQueryListParams])
        return query;
    }

    public getNextQuery() {
        this.skip += this.take;
        return this.getQuery();
    }

    public resetQuery(queryList?: IQueryListParams) {
        this.skip = queryList?.skip || this.initialQuery?.skip || 0;
        this.take = queryList?.take || this.initialQuery?.take || ConfigService.defaultQueryLimit;
        this.orderBy = queryList?.orderBy || this.initialQuery?.orderBy || '';
        this.order = queryList?.order || this.initialQuery?.order || '';
        this.searchQuery = queryList?.searchQuery || this.initialQuery?.searchQuery || '';
        return this.getQuery();
    }
}