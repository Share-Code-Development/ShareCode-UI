import { IQueryListParams } from "../models/queryList.model";
import { ConfigService } from "../services/config.service";

export class QueryListParams implements IQueryListParams {
    public skip: number
    public limit: number;
    public sort: string;
    public order: string;
    public search: string;

    constructor(queryList?: IQueryListParams) {
        this.skip = queryList?.skip || 0;
        this.limit = queryList?.limit || ConfigService.defaultQueryLimit;
        this.sort = queryList?.sort || '';
        this.order = queryList?.order || '';
        this.search = queryList?.search || '';
    }

    public getQuery() {
        const query: {[key: string]: any} = {
            skip: this.skip,
            limit: this.limit,
            sort: this.sort,
            order: this.order,
            search: this.search
        }
        // remove falsy values
        Object.keys(query).forEach(key => (!query[key] && typeof query[key] !== 'number') && delete query[key])
        return query;
    }

    public getNextQuery() {
        this.skip += this.limit;
        return this.getQuery();
    }

    public resetQuery(queryList?: IQueryListParams) {
        this.skip = queryList?.skip || 0;
        this.limit = queryList?.limit || ConfigService.defaultQueryLimit;
        this.sort = queryList?.sort || '';
        this.order = queryList?.order || '';
        this.search = queryList?.search || '';
        return this.getQuery();
    }
}