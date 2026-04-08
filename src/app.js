import express from "express";
import apiRoutes from "./routes/index.js"
import globalErrorHandling from "./middleware/globalErrorHandling.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", apiRoutes);

app.use(globalErrorHandling);

export default app;