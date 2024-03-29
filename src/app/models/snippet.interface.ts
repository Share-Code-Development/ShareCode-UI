import { IUser } from "./user.interface";

export interface IComment {
    _id?: string;
    comment: string;
    createdBy: string;
    createdAt?: string | Date;
}

export interface IReaction {

}

export interface ISnippet {
    id: string,
    title: string,
    description: string,
    language: string,
    previewCode: string,
    tags: string[],
    public: boolean,
    views: number,
    copy: number,
    ownerId: string | null,
    reactions: IReaction[],
    commentCount: number,
    blob: string,
    accessControl: unknown[],
    lineComments: unknown[],
    isCommentsLimited: boolean,
    selfReaction: null | IReaction
}
// export interface ISnippet {
//     title?: string,
//     code: string,
//     summary?: string,
//     language?: string,
//     tags: string[],
//     isPublic: boolean,
//     createdBy: string,
//     copies: number,
//     views: number,
//     comments: string[],
//     likes: string[],
//     createdAt: string | Date,
//     _id?: string,
// }

export interface ISnippetResponse {
    commentCount: number;
    copy: number;
    description: string;
    id: string;
    ownerId: string;
    owner?: IUser;
    public: boolean;
    reactions: unknown[];
    title: string;
    totalCount: number;
    view: number;
    language: string;
    createdAt: string | Date;
    previewCode: string;
    tags?: string[];
    summary?: string;
    selfLiked?: boolean;
}
