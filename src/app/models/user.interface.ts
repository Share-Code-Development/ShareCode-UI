export interface IUser {
    password?: string;
    profilePicture?: string | null;
    firstName: string;
    lastName: string;
    middleName?: string;
    emailAddress: string;
    settings?: IUserSettings;
    userId?: string;
    visibility?: EProfileVisibility;
}


export interface IUserSettings {
    allowTagging: boolean;
}

export enum EProfileVisibility {
    visible = 1,
    hidden = 0
}