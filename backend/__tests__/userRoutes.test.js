require("dotenv").config({ path: ".env.test" });
const jwt = require("jsonwebtoken");
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);
const db = require("./utils/db");
const User = require("../models/User");

beforeAll(async () => {
  jest.setTimeout(15000);

  await db.connectToDatabase();
});

afterEach(async () => {
  await db.clearDatabase();
  await jest.clearAllMocks();
});

afterAll(async () => {
  await db.closeDatabase();
});

mock.onPost("https://oauth2.googleapis.com/token").reply(200, {
  access_token:
    "ya29.a0ARrdaM9vkLmzGW53RrsfUOER_iHNzRanXMxOy-VVNBaorf5Il28RK77y6TlnIn52P6Is9Ddg67NRUmBdWrlmxo4V0XSlyeQIVKKT2veXhjDJpMH61vRGwz3gStsJtTaT7t6U0I-ie-GrCNaRLXB79CgGNOoI",
  expires_in: 3599,
  scope:
    "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  token_type: "Bearer",
  id_token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBmY2MwMTRmMjI5MzRlNDc0ODBkYWYxMDdhMzQwYzIyYmQyNjJiNmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MTgxNDE2NDcwMTctcnBzdm5iZjg5aDBzbXNyZWxubmRocW4wb29qMTFvcTYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MTgxNDE2NDcwMTctcnBzdm5iZjg5aDBzbXNyZWxubmRocW4wb29qMTFvcTYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc0OTA2NjQzNDkwNjI5NzQ3MDgiLCJlbWFpbCI6ImV2YWd1cnViaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkJ6TlM5RUZBYWdCZWdJSUJLS05mdHciLCJuYW1lIjoiw4l2YSBHdXJ1YmkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2prME5udU5iMWhDVjR1enEwY2h2eHdsTkZORnhRQlItZ2lmc2NXV0E9czk2LWMiLCJnaXZlbl9uYW1lIjoiw4l2YSIsImZhbWlseV9uYW1lIjoiR3VydWJpIiwibG9jYWxlIjoiaHUiLCJpYXQiOjE2Mjg1Mjk1MzUsImV4cCI6MTYyODUzMzEzNX0.Xi9WqPRuAVveIZirjwuKyecA4USE-Dduv56-JJXSzZmGnJAWQIaK7iZSGvfbogxJBwhPul7FYWAEgRu_AIWpi4YRy1qCcNCROjYfp1mxF7WZehOrcbKHMLfmOijzD4kgHtE1kBB3guKctmbEgJ4ml1nBZwjixm97LRYkRjldM4lbCngPBnCxLjn_70hq5QGWS2vMFt2Po7bnoCIXXlgR-lZuK8F1yahWF_1_eynNww3Dc_vhE1glsOpi7cEfDf6v2ct9WYKT1haw1KZj9th04VSUVseErSQBesTYZoUL74irXiTJ117eXGTMZL5hlEGkyhnm4jGXQF6p33Ju0k95iw",
});

global.console.log = jest.fn();

describe("It tests if mock adapter works", () => {
  it("Should come back with 200 ", async () => {
    //given
    const result = await axios.post("https://oauth2.googleapis.com/token", {});

    //then
    expect(result.status).toBe(200);
  });
});

describe("Login route tests", () => {
  it("Should come back with 200 with proper request data", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };

    //when
    const response = await request.post("/api/account/login").send(token);
    const users = await User.find();
    //then
    expect(global.console.log).toHaveBeenCalledWith("Email sent successfully");
    expect(response.status).toBe(200);
    expect(users.length).toEqual(1);
    expect(users[0].name).toBe("Éva Gurubi");
  });

  it("Should log in for both requests but put user in DB only once because second time they are not a new user", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };

    //when
    const response1 = await request.post("/api/account/login").send(token);
    const response2 = await request.post("/api/account/login").send(token);
    const users = await User.find();

    //then
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(users.length).toEqual(1);
    expect(users[0].name).toBe("Éva Gurubi");
  });

  it("Should only send email to new users", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };

    //when
    const response1 = await request.post("/api/account/login").send(token);
    const response2 = await request.post("/api/account/login").send(token);
    //then
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(global.console.log).toHaveBeenCalledTimes(1);
    expect(global.console.log).toHaveBeenCalledWith("Email sent successfully");
  });
});

describe("User account GET requests", () => {
  it("Should come back with 200 and with proper user data for correct auth token", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };
    await request.post("/api/account/login").send(token);
    const users = await User.find();
    //when
    const evagurubi = { id: "117490664349062974708" };
    const myToken = jwt.sign(evagurubi, process.env.TOKEN_SECRET);
    const response = await request
      .get("/api/account")
      .set("auth-token", myToken);

    //then
    expect(response.status).toBe(200);
    expect(users.length).toEqual(1);
    expect(users[0].name).toBe("Éva Gurubi");
    expect(response.body.email).toBe("evagurubi@gmail.com");
  });

  it("Should come back with empty array for wrong auth token", async () => {
    const token = {
      code: "Somebodywhowantstologin",
    };
    await request.post("/api/account/login").send(token);
    const users = await User.find();
    //when
    const evagurubi = { id: "somebodymanipulatedwithtoken" };
    const myToken = jwt.sign(evagurubi, process.env.TOKEN_SECRET);
    const response = await request
      .get("/api/account")
      .set("auth-token", myToken);

    //then
    expect(response.status).toBe(200);
    expect(users.length).toEqual(1);
    expect(users[0].name).toBe("Éva Gurubi");
    expect(response.body.email).toBe(undefined);
  });
});

describe("User account DELETE requests", () => {
  it("Should come back with 204 and result in empty database if proper id is sent.", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };
    await request.post("/api/account/login").send(token);

    //when
    const evagurubi = { id: "117490664349062974708" };
    const myToken = jwt.sign(evagurubi, process.env.TOKEN_SECRET);
    const response = await request
      .delete("/api/account")
      .set("auth-token", myToken);

    const users = await User.find();
    //then
    expect(response.status).toBe(204);
    expect(users.length).toEqual(0);
    expect(response.body).toEqual({});
  });

  it("Shouldn't delete user from database if id is not correct.", async () => {
    //given
    const token = {
      code: "Somebodywhowantstologin",
    };
    await request.post("/api/account/login").send(token);

    //when
    const evagurubi = { id: "somebodymanipulatedwithtoken" };
    const myToken = jwt.sign(evagurubi, process.env.TOKEN_SECRET);
    await request.delete("/api/account").set("auth-token", myToken);

    const users = await User.find();
    //then
    expect(users.length).toEqual(1);
  });
});
