import express from "express";
import { rootPath, viewPath } from "./utils.js";
import taskRouter from "./routes/task.js";

const app = express();

//setting up the view engine
app.set("view engine", "pug");
app.set("views", viewPath());

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(taskRouter);

app.use("/assets", express.static(rootPath("assets")));

export default app;
