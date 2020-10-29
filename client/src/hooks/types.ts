
export interface HttpHeader {
    name:string,
    value: string
}

export interface HttpRequest {
    url?: string,
    method: "get" | "post",
    headers?: HttpHeader,
    params?: string,
    data?: any
}

export interface HttpResponse {
    status?: string | number,
    message?: string,
    body?: object | string
}