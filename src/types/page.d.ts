/**
 * 分页查询参数
 */
export type PageQuery = {
    pageNum: number,
    pageSize: number,
    sortBy?: string,
    isAsc?: boolean
}


/**
 * 分页查询返回类型
 */
export type PageDTO<T> = {
    pageNum: number,
    pageSize: number,
    total: number
    pages: number
    list: T[]
}