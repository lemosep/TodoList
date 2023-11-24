import express, { urlencoded } from "express";
import todoRouter from "./routes/todo.js";
import { rootPath, viewPath } from "./utils.js";

const app = express();

//setting up the view engine
app.set("view engine", "pug");
app.set("views", viewPath());

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(todoRouter);

app.use("/assets", express.static(rootPath("assets")));

export default app;
