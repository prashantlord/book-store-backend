import mongoose from 'mongoose';
import {faker} from '@faker-js/faker';
import Book from '../models/bookModel.js';

const MONGO_URI = "mongodb://admin:password@localhost:3001/mydb?authSource=admin";
const authorId = '69d13f141bad70f451a0e081';

const categories = [
    'Science Fiction', 'Fantasy', 'Mystery', 'Romance',
    'Thriller', 'Non-Fiction', 'Biography', 'History',
    'Comics', 'Technology'
];

const currencies = ['USD', 'EUR', 'INR', 'NPR'];

async function seedBooks(number = 10) {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        const books = Array.from({length: number}).map(() => {
            const numCategories = faker.number.int({min: 1, max: 3});

            // 🔥 Generate reviews (0–100)
            const reviews = Array.from({
                length: faker.number.int({min: 0, max: 100})
            }).map(() => ({
                user: authorId, // ideally random user IDs
                rating: faker.number.int({min: 1, max: 5}),
                comment: faker.lorem.sentence(),
            }));

            // 🔥 Calculate rating stats
            const reviewCount = reviews.length;

            const averageRating = reviewCount
                ? Number((
                    reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
                ).toFixed(1))
                : 0;

            return {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                author: authorId,
                price: {
                    amount: faker.number.int({min: 200, max: 10000}),
                    currency: faker.helpers.arrayElement(currencies),
                },
                categories: faker.helpers.arrayElements(categories, numCategories),
                fileUrl: faker.internet.url(),
                coverImageUrl: faker.image.url({width: 200, height: 300}),

                // 🔥 Reviews + stats
                reviews,
                averageRating,
                reviewCount,
            };
        });

        await Book.insertMany(books);

        await mongoose.disconnect();
        console.log('MongoDB disconnected');

        return `${number} books added successfully`;
    } catch (err) {
        console.error('Error seeding books:', err);
    }
}

seedBooks(20).then(r => console.log(r));