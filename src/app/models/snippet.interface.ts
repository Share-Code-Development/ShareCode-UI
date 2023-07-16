import { IUser } from "./user.interface";

export interface IComment {
    _id?: string;
    comment: string;
    createdBy: string;
    createdAt?: string | Date;
}

export interface ISnippet {
    title?: string,
    code: string,
    summary?: string,
    language?: string,
    tags: string[],
    isPublic: boolean,
    createdBy: string | IUser,
    copies: number,
    views: number,
    comments?: string[] | IUser[],
    likes?: string,
    isDeleted?: string,
    createdAt: string,
    commentsCount?: number,
    likesCount?: number,
}