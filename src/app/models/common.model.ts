export interface INotificationConfig {
    text: string,
    color: string,
    isLoading?: boolean,
    stop?: () => void,
    success?: (text: string) => void,
    error?: (error: any) => void
}


export type Prettify<T> = {
    [k in keyof T]: T[k]
    // eslint-disable-next-line @typescript-eslint/ban-types
} & {}