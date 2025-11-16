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

export type BookVO = {
    title: string
    author: string
    summary: string
    coverImage: string
    categoryName: string
}