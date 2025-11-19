import { PageQuery } from "./page"

/**
 * 书籍信息
 */
export type Book = {
    bookId: number
    title: string
    author: string
    publisher: string
    publicationDate: string
    price: number
    summary: string
    coverImage: string
    isbn: string
    categoryId: number
    categoryName: string
}

/**
 * 书籍VO
 */
export type BookVO = {
    bookId: string
    title: string
    author: string
    summary: string
    coverImage: string
    categoryName: string
}

/**
 * 书籍查询参数
 */
export type BookQuery = PageQuery & {
    title?: string
    author?: string
    categoryId?: number
    summary?: string
    coverImage?: string
    categoryName?: string
}