const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const db = require("./db");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Tests the test environment", () => {
  it("Tests to see if Jest works", () => {
    expect(1).toBe(1);
  });

  it("Gets the test endpoint", async () => {
    // Sends GET Request to /test endpoint
    //when
    const response = await request.get("/api");

    //then
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("We are on home");
  });
});
