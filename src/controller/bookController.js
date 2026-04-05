import {getBooksService, getSingleBookService} from '../services/books/bookService.js';

export const getPublicBooks = async (req, res) => {
    try {
        const books = await getBooksService(req, res);
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
}

export const getSingleBook = async (req, res) => {
    try {
        const books = await getSingleBookService(req, res);
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
}
