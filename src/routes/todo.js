import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { htmlPath } from "../utils.js";

// logic for the todo routes
const todoRouter = Router();
const prisma = new PrismaClient();

/* Validating fields
 * name not null
 * date not null
 * date is a valid date
 */
const bodyZod = z.object({
  name: z.string({ message: "Nome é obrigatório" }).min(1),
  date: z.number({ message: "Data inválida" }).nonnegative(),
});

// GET all todos
todoRouter.get("/todo", async (req, res) => {
  const todos = await prisma.todo.findMany({});

  return res.sendFile(htmlPath("index.html"));
});

// CREATE todo
todoRouter.post("/todo", async (req, res) => {
  const { name, date } = req.body;

  if (!bodyZod.safeParse(req.body).success) {
    return res
      .status(400)
      .json({ error: bodyZod.safeParse(req.body).error.issues[0].message });
  }

  await prisma.todo.create({
    data: {
      name,
      date: new Date(date),
    },
  });

  return res.json({ name, date });
});

//DELETE todo
todoRouter.delete("/todo", async (req, res) => {
  const { id } = req.params;

  if (!bodyZod.safeParse(req.body).success) {
    return res.status(400).json({ error: "Internal server error" });
  }

  await prisma.todo.delete({
    where: {
      id,
    },
  });

  return res.json({ id });
});

export default todoRouter;
