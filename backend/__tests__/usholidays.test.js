const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);
const db = require("./utils/db");
const USholiday = require("../models/USholiday");

beforeAll(async () => await db.connectToDatabase());

afterEach(async () => {
  await db.clearDatabase();
  jest.clearAllMocks();
});

afterAll(async () => {
  await db.closeDatabase();
});

mock
  .onGet(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=US&year=2021&month=8&day=13`
  )
  .reply(200, [
    {
      name: "Friday the 13th",
      name_local: "",
      language: "",
      description: "",
      country: "US",
      location: "",
      type: "worldwide holiday",
      date: "13/8/2021",
      date_year: "2021",
      date_month: "8",
      date_day: "13",
      week_day: "Friday",
    },
  ]);
mock
  .onGet(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=US&year=2021&month=1&day=1`
  )
  .reply(200, [
    {
      name: "New Year's Day",
      name_local: "",
      language: "",
      description: "",
      country: "US",
      location: "",
      type: "public_holiday",
      date: "1/1/2021",
      date_year: "2021",
      date_month: "1",
      date_day: "1",
      week_day: "Friday",
    },
  ]);

let spy = jest.spyOn(axios, "get");

describe("Tests GET requests to /api/usholidays endpoint", () => {
  it("Should return holiday and writes it in DB if it wasn't there before.", async () => {
    // given an empty db
    //when
    const response = await request.get(
      "/api/usholidays?year=2021&month=8&day=13"
    );

    const usholidays = await USholiday.find();
    //then
    expect(spy).toHaveBeenCalled();
    expect(usholidays.length).toEqual(1);
    expect(response.status).toBe(200);
    expect(response.body.message.name).toBe("Friday the 13th");
  });

  it("Should return holiday and writes it in DB only if wasn't there before.", async () => {
    // given an empty db
    //when
    const response = await request.get(
      "/api/usholidays?year=2021&month=8&day=13"
    );
    const res = await request.get("/api/usholidays?year=2021&month=8&day=13");

    const resp = await request.get("/api/usholidays?year=2021&month=1&day=1");

    const usholidays = await USholiday.find();
    //then
    expect(usholidays.length).toEqual(2);
    expect(response.status).toBe(200);
    expect(res.status).toBe(200);
    expect(resp.status).toBe(200);
    expect(response.body.message.name).toBe("Friday the 13th");
    expect(res.body.message.name).toBe("Friday the 13th");
    expect(resp.body.message.name).toBe("New Year's Day");
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
