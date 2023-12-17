export enum EAuthType {
    general = 0,
    google = 1
}

export enum EGatewayType {
    verifyUserAccount = 0,
    forgotPassword = 1
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}