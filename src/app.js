import express from "express";
import apiRoutes from "./routes/index.js"

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api", apiRoutes);

export default app;