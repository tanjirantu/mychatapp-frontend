export interface IApiResponse<T> {
    message: string;
    result: T;
    statusCode: number;
}
