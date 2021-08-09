require("dotenv").config({ path: ".env.test" });
const app = require("../server"); // Link to your server file
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const request = supertest(app);
const db = require("./utils/db");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Tests responses with no authorization", () => {
  it("Should send 401 when there's no authorization", async () => {
    //when
    const response = await request.get("/api/articleswithtasks");

    //then
    expect(response.text).toBe("Access denied");
    expect(response.status).toBe(401);
  });
});

describe("Tests responses with authorization", () => {
  it("Should send 200 when there's authorization with appropriate body", async () => {
    //given
    const someone = "someone";
    const myToken = jwt.sign({ someone }, process.env.TOKEN_SECRET);
    // console.log("token:", myToken);
    //when
    // console.log("My secret:", process.env.TOKEN_SECRET);
    const response = await request
      .get("/api/articleswithtasks")
      .set("auth-token", `${myToken}`);

    //then

    expect(response.status).toBe(200);
  });
});
