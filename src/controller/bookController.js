import {getBooksService, getSingleBookService} from '../services/books/bookService.js';

export const getPublicBooks = async (req, res) => {
    const category = req.params.category;
    try {
        const books = await getBooksService(category);
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        return res.status(400).json({error: err.message});
    }
}

export const getSingleBook = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const books = await getSingleBookService(bookId);
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        return res.status(400).json({error: err.message});
    }
}
