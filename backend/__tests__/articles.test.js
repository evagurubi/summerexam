require("dotenv").config({ path: ".env.test" });
const app = require("../server"); // Link to server file
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const request = supertest(app);
const db = require("./utils/db");
const Article = require("../models/Article");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("It tests get requests to the /api/articles endpoint", () => {
  it("Should return empty array for GET request when there is nothing in the DB", async () => {
    // given an empty db

    //when
    const response = await request.get("/api/articles");

    //then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it("Should return object from database for GET request without auth-token in header", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign({ someone }, process.env.TOKEN_SECRET);

    const newArticle = {
      title: "newtitle",
      keywords: "newkeyword",
      warmer: "newwarmerquestion",
      content: "somethingverylong",
      photoURL: "newphotourl",
      originalURL: "newarticleurl",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    const articles = await Article.find();
    const response = await request.get("/api/articles");

    expect(articles.length).toEqual(1);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  it("Should return all objects from database for GET request without auth-token in header", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign({ someone }, process.env.TOKEN_SECRET);

    const newArticle = {
      title: "newtitle",
      keywords: "newkeyword",
      warmer: "newwarmerquestion",
      content: "somethingverylong",
      photoURL: "newphotourl",
      originalURL: "newarticleurl",
    };

    const newArticle2 = {
      title: "newtitle2",
      keywords: "newkeyword2",
      warmer: "newwarmerquestion2",
      content: "somethingverylong2",
      photoURL: "newphotourl2",
      originalURL: "newarticleurl2",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    const articles = await Article.find();
    const response = await request.get("/api/articles");

    expect(articles.length).toEqual(2);
    expect(response.body.length).toEqual(articles.length);
    expect(response.status).toBe(200);
  });

  it("Should return only article title and content from database for GET request with auth-token in header", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign({ someone }, process.env.TOKEN_SECRET);

    const newArticle = {
      title: "newtitle",
      keywords: "newkeyword",
      warmer: "newwarmerquestion",
      content: "somethingverylong",
      photoURL: "newphotourl",
      originalURL: "newarticleurl",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    const articles = await Article.find();
    const response = await request
      .get("/api/articles")
      .set("auth-token", `${myToken}`);

    expect(articles.length).toEqual(1);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].photoURL).toBe(undefined);
    expect(response.status).toBe(200);
  });
});

describe("It tests POST requests to /api/articles endpoint", () => {
  it("Should put article in database when sent with proper authorization", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign({ someone }, process.env.TOKEN_SECRET);

    const newArticle = {
      title: "newtitle",
      keywords: "newkeyword",
      warmer: "newwarmerquestion",
      content: "somethingverylong",
      photoURL: "newphotourl",
      originalURL: "newarticleurl",
    };

    const response = await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    const articles = await Article.find();

    expect(response.status).toBe(201);
    expect(articles.length).toEqual(1);
    expect(articles[0].title).toBe(newArticle.title);
  });
});
