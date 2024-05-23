export interface ApiData<T> {
    code?: number
    detail?: string
    data?: T,
    total?: number
}