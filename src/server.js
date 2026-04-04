import * as dotenv from 'dotenv';
import connectMongoDb from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://admin:password@localhost:3001/mydb?authSource=admin";

connectMongoDb(MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})