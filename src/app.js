import express from "express";
import todoRouter from "./routes/todo.js";
import { rootPath } from "./utils.js";

const app = express();

// middlewares
app.use(express.json());

app.use(todoRouter);

app.use("/assets", express.static(rootPath("assets")));

export default app;
