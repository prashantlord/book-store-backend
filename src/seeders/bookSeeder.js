import Book from '../models/bookModel.js';

async function bookSeeder(req, res) {
    const newBook = {
        title: "The Future of AI",
        description: "An insightful look into how artificial intelligence will shape our world.",
        author: "69d5f38690c89b507d6637df",
        price: {
            amount: 500,
            currency: "NPR"
        },
        categories: ["Technology"],
        fileUrl: "https://example.com/books/future-of-ai.pdf",
        coverImageUrl: "https://example.com/images/future-of-ai.jpg" // optional
    };

    await Book.create(newBook);

    console.log("Book created:", newBook);
}

bookSeeder();

