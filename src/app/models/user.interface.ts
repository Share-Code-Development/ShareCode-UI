export interface IUser {
    password?: string;
    profilePicture?: string | null;
    firstName: string;
    lastName: string;
    middleName?: string;
    emailAddress: string;
    settings?: IUserSettings;
    permissions?: string[];
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

export interface IUserParams {
    includeSettings?: boolean;
}

export enum EUserPermissions {
    createSnippet = "create-snippet",
    viewSnippet = "view-snippet",
    updateSnippet = "update-snippet",
    deleteSnippet = "delete-snippet",
    updateUser = "update-user",
    viewUserProfileOthers = "view-user-profile-others"
}