// Write your tests here
const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("auth router tests", () => {
  it("creates a new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "bob", password: "1234" });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("bob");
    expect(res.body.id).toBeDefined();
  });

  it("client login to an account", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "bob", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/welcome, bob/i);
    expect(res.body.token).toBeDefined();
  });
});
