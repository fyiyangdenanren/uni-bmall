import { BookVO } from "@/types/mall";
import { PageDTO, PageQuery } from "@/types/page";
import { http } from "@/utils/http";

/**
 * 获取新书书籍列表
 */
export function getNewBooks(data?: PageQuery) {
    return http<PageDTO<BookVO>>({
        method: 'GET',
        url: '/book/new',
        data,
    })
}

/**
 * 获取评分书籍列表
 */
export function getScoreBooks(data?: PageQuery) {
    return http<PageDTO<BookVO>>({
        method: 'GET',
        url: '/book/score',
        data,
    })
}