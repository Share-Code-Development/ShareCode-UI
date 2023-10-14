export interface INotificationConfig {
    text: string,
    color: string,
    isLoading?: boolean,
    stop?: () => void,
    success?: (text: string) => void,
    error?: (error: any) => void
}
