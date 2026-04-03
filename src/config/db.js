import mongoose from 'mongoose';

export default async function connectMongoDb(uri) {
    await mongoose.connect(uri).then((res) => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.error(err);
    });
}