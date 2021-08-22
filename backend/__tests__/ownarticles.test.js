require("dotenv").config({ path: ".env.test" });
const jwt = require("jsonwebtoken");
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
//const mock = new MockAdapter(axios);
const db = require("./utils/db");
const Article = require("../models/Article");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("It tests get requests to the /api/articles/own endpoint", () => {
  it("Should return empty array for GET request with proper auth-token but with no articles by user in DB", async () => {
    //given
    const someone = { id: "someone" };
    const myToken = jwt.sign(someone, process.env.TOKEN_SECRET);

    const someoneelse = { id: "someoneelse" };
    const myToken2 = jwt.sign(someoneelse, process.env.TOKEN_SECRET);

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
    const response = await request
      .get("/api/articles/own")
      .set("auth-token", `${myToken2}`);
    // console.log("res", response.body);
    expect(articles.length).toEqual(2);
    expect(response.body.length).toEqual(0);
    expect(response.status).toBe(200);
  });
  it("Should return array with user's own articles and tasks only for GET request with proper auth-token", async () => {
    //given
    const someone = { id: "someone" };
    const myToken = jwt.sign(someone, process.env.TOKEN_SECRET);

    const someoneelse = { id: "someoneelse" };
    const myToken2 = jwt.sign(someoneelse, process.env.TOKEN_SECRET);

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
    const newArticle3 = {
      title: "newtitle3",
      keywords: "newkeyword3",
      warmer: "newwarmerquestion3",
      content: "somethingverylong3",
      photoURL: "newphotourl3",
      originalURL: "newarticleurl3",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken2}`)
      .send(newArticle3);

    const articles = await Article.find();
    const response = await request
      .get("/api/articles/own")
      .set("auth-token", `${myToken}`);
    // console.log("res", response.body);
    expect(articles.length).toEqual(3);
    expect(response.body.length).toEqual(2);
    expect(response.body[0].warmer).toBe("newwarmerquestion");
    expect(response.status).toBe(200);
  });

  it("Should return array with all articles of every user only for GET request with proper auth-token from admin", async () => {
    //given
    const someone = { id: "117490664349062974708", isAdmin: true };
    const myToken = jwt.sign(someone, process.env.TOKEN_SECRET);

    const someoneelse = { id: "someoneelse" };
    const myToken2 = jwt.sign(someoneelse, process.env.TOKEN_SECRET);

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
    const newArticle3 = {
      title: "newtitle3",
      keywords: "newkeyword3",
      warmer: "newwarmerquestion3",
      content: "somethingverylong3",
      photoURL: "newphotourl3",
      originalURL: "newarticleurl3",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken2}`)
      .send(newArticle3);

    const articles = await Article.find();
    const response = await request
      .get("/api/articles/own")
      .set("auth-token", `${myToken}`);
    // console.log("res", response.body);
    expect(articles.length).toEqual(3);
    expect(response.body.length).toEqual(3);
    expect(response.body[2].warmer).toBe("newwarmerquestion");
    expect(response.status).toBe(200);
  });
});

describe("Tests PATCH and DELETE requests to /api/articles/own endpoint", () => {
  it("Should update article in DB if request sent with proper token", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign(someone, process.env.TOKEN_SECRET);
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

    const articles = await Article.find();
    const testID = articles[0]._id;

    const response = await request
      .patch(`/api/articles/own/${testID}`)
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    const patchedarticles = await Article.find();

    expect(response.status).toBe(201);
    expect(patchedarticles.length).toBe(1);
    expect(patchedarticles[0]._id).toEqual(testID);
    expect(patchedarticles[0].title).toBe("newtitle2");
  });

  it("Should delete specific article from DB if request sent with proper token", async () => {
    const someone = { id: "someone" };
    const myToken = jwt.sign(someone, process.env.TOKEN_SECRET);
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
    const testID = articles[0]._id;

    const response = await request
      .delete(`/api/articles/own/${testID}`)
      .set("auth-token", `${myToken}`);

    const articleDB = await Article.find();

    expect(response.status).toBe(204);
    expect(articleDB.length).toBe(0);
  });
});
