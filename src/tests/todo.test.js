import request from "supertest";
import express from "express";
import todoRouter from "../routes/todo.js";

// mocking prisma client, so we can test without connecting to the database
jest.mock("@prisma/client", () => ({
  __esModule: true,
  PrismaClient: jest.fn(() => ({
    todo: {
      findMany: jest.fn().mockImplementation(({}) => [{}]),
    },
  })),
}));

afterAll((done) => {
  done();
});

describe("GET /todo", () => {
  it("should return a list of todos", async () => {
    console.log("test started!");

    const app = express();
    app.use(todoRouter);

    const response = await request(app).get("/todo");

    console.log("response is: ", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{}]);
  });
});
