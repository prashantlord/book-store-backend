import {getBooksService, getSingleBookService} from '../services/books/bookService.js';

export const getPublicBooks = async (req, res) => {
    const category = req.params?.category;

    const books = await getBooksService(category);
    return res.status(200).json(books);
}

export const getSingleBook = async (req, res) => {
    const bookId = req.params.bookId;

    const books = await getSingleBookService(bookId);
    return res.status(200).json(books);
}
