import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

// logic for the todo routes
const todoRouter = Router();
const prisma = new PrismaClient();

/* Validating fields
 * name not null
 * date not null
 * date is a valid date
 */
const bodyZod = z.object({
  name: z.string({ error: "Please type a valid name" }).min(1),
  date: z.string({ error: "Please type a valid date" }),
});

// GET all todos - return them sorted by date
todoRouter.get("/", async (req, res) => {
  const tasks = await prisma.todo.findMany({});

  const sortedtasks = tasks.sort((a, b) => a.date - b.date);

  sortedtasks.forEach((task) => {
    task.date = task.date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  return res.render("main", { tasks: sortedtasks });
});

// CREATE todo
todoRouter.post("/todo", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const validation = bodyZod.safeParse(req.body);

    if (!validation.success) {
      throw new Error(validation.error.issues[0].message);
    }

    const { name, date } = validation.data;

    if (!name || !date) {
      throw new Error("Name and date are required fields.");
    }

    const newTask = await prisma.todo.create({
      data: {
        name,
        date: new Date(date),
      },
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

//DELETE todo
todoRouter.post("/todo-delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error("ID is a required field.");
    }

    const deletedTask = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

export default todoRouter;
