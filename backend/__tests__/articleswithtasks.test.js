require("dotenv").config({ path: ".env.test" });
const app = require("../server"); // Link to your server file
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

describe("Tests responses with no authorization", () => {
  it("Should send 401 when there's no authorization", async () => {
    //when
    const response = await request.get("/api/articles/withtasks");

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
      .get("/api/articles/withtasks")
      .set("auth-token", `${myToken}`);

    //then

    expect(response.status).toBe(200);
  });

  it("Should return task and URLs as well as title from DB when sent with proper authorization", async () => {
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
      .get("/api/articles/withtasks")
      .set("auth-token", `${myToken}`);

    //then

    expect(articles[0].warmer).toBe(newArticle.warmer);
    expect(articles.length).toEqual(1);
    expect(articles[0].title).toBe(newArticle.title);
    expect(response.status).toBe(200);
    expect(response.body[0].photoURL).toBe("newphotourl");
  });
});
describe("Tests requests with keyword and content queryparameters", () => {
  it("Should return article if keywords include the chunk in the queryparameter", async () => {
    //given
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
      title: "newtitle",
      keywords: "something something else",
      warmer: "newwarmerquestion",
      content: "somethingverylong",
      photoURL: "newphotourl",
      originalURL: "newarticleurl",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    //when
    const articles = await Article.find();
    const response = await request
      .get("/api/articles/withtasks?keyword=newkey")
      .set("auth-token", `${myToken}`);

    //then
    expect(articles.length).toEqual(2);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].photoURL).toBe("newphotourl");
    expect(response.status).toBe(200);
  });

  it("Should return article if content contains the chunk in the queryparameter", async () => {
    //given
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
      title: "newtitle",
      keywords: "something something else",
      warmer: "newwarmerquestion",
      content:
        "Once upon a midnight dreary, while I pondered, weak and weary ... Only this and nothing more.",
      photoURL: "newphotourl2",
      originalURL: "newarticleurl",
    };

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle);

    await request
      .post("/api/articles")
      .set("auth-token", `${myToken}`)
      .send(newArticle2);

    //when
    const articles = await Article.find();
    const response = await request
      .get("/api/articles/withtasks?content=ponder")
      .set("auth-token", `${myToken}`);

    //then
    expect(articles.length).toEqual(2);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].photoURL).toBe("newphotourl2");
    expect(response.status).toBe(200);
  });
});
