import { Prettify } from "./common.model";
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
    createdBy: string,
    copies: number,
    views: number,
    comments: string[],
    likes: string,
    createdAt: string,
    _id?: string,
}

export type TSnippetResponse = Prettify<Omit<ISnippet, 'createdBy' | 'comments' | 'likes'> & {
    createdBy: IUser;
    comments: Omit<IComment, 'createdBy'> & {
        createdBy: IUser;
    }[],
    likes: IUser[],
    commentsCount?: number,
    likeCount?: number,
}>;