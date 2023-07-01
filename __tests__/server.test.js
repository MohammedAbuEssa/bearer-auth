const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { sequelize } = require("../src/models/index");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Secret = process.env.SECRET;
beforeAll(async () => {
  await sequelize.sync();
});
describe("server testing", () => {
  test("POST to /signup to create a new user", async () => {
    const responce = await request.post("/signup").send({
      username: "ahmad",
      password: "123",
    });
    expect(responce.status).toBe(201);
  });

  test("POST to /signin to login with wrong password (use basic auth)", async () => {
    const responce = await request
      .post("/signin")
      .set({ authorization: base64.encode(`ahmad:1234`) });
    expect(responce.status).toBe(500);
  });
  test("POST to /signin to login with wrong username (use basic auth)", async () => {
    const responce = await request
      .post("/signin")
      .set({ authorization: base64.encode(`ahmadd:123`) });
    expect(responce.status).toBe(500);
  });
});

afterAll(async () => {
  await sequelize.drop();
});
