require("dotenv").config({ path: ".env.test" });
//const jwt = require("jsonwebtoken");
const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);
const db = require("./utils/db");
const User = require("../models/User");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
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

describe("It tests if mock adapter works", () => {
  it("Should come back with 200 ", async () => {
    //given
    const result = await axios.post("https://oauth2.googleapis.com/token", {});

    //then
    // console.log("result:", result);

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
    const response = await request.post("/api/login").send(token);
    // console.log("response", response);
    const users = await User.find();
    //then
    console.log(users);
    expect(response.status).toBe(200);
    expect(users.length).toEqual(1);
    expect(users[0].name).toBe("Éva Gurubi");
  });
});
