import { BookQuery, BookVO } from "@/types/mall";
import { PageDTO } from "@/types/page";
import { Category } from "@/types/shop";
import { http } from "@/utils/http";

/**
 * 获取分类图书
 */
export function getBooks(data?: BookQuery) {
    return http<PageDTO<BookVO>>({
        method: 'GET',
        url: '/book/list',
        data,
    })
}

/**
 * 获取分类列表
 */
export function getCategories() {
    return http<Category[]>({
        method: 'GET',
        url: '/book/category',
    })
}