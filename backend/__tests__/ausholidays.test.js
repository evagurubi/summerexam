const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);
const db = require("./utils/db");
const Ausholiday = require("../models/Ausholiday");

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
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=AU&year=2021&month=8&day=13`
  )
  .reply(200, []);
mock
  .onGet(
    `https://holidays.abstractapi.com/v1/?api_key=f1fab01a5ea24ac7afd5eecb600df352&country=AU&year=2021&month=1&day=1`
  )
  .reply(200, [
    {
      name: "New Year's Day",
      name_local: "",
      language: "",
      description: "",
      country: "AU",
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

describe("Tests GET requests to /api/ausholidays endpoint", () => {
  it("Should return holiday and writes it in DB if it wasn't there before.", async () => {
    // given an empty db
    //when
    const response = await request.get(
      "/api/holidays/aus?year=2021&month=8&day=13"
    );

    const ausholidays = await Ausholiday.find();
    //then
    expect(spy).toHaveBeenCalled();
    expect(ausholidays.length).toEqual(1);
    expect(ausholidays[0].name).toBe("");
    expect(response.status).toBe(200);
    expect(response.body.message.name).toBe("");
  });

  it("Should return holiday and writes it in DB only if wasn't there before.", async () => {
    // given an empty db
    //when
    const response1 = await request.get(
      "/api/holidays/aus?year=2021&month=8&day=13"
    );
    const response2 = await request.get(
      "/api/holidays/aus?year=2021&month=8&day=13"
    );

    const response3 = await request.get(
      "/api/holidays/aus?year=2021&month=1&day=1"
    );

    const ausholidays = await Ausholiday.find();
    //then
    expect(ausholidays.length).toEqual(2);
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
    expect(response1.body.message.name).toBe("");
    expect(response2.body.message.name).toBe("");
    expect(response3.body.message.name).toBe("New Year's Day");
  });

  it("Should only call the Holidays API if holiday for the day is not in DB.", async () => {
    // given an empty db
    //when
    await request.get("/api/holidays/aus?year=2021&month=8&day=13");
    await request.get("/api/holidays/aus?year=2021&month=8&day=13");

    await request.get("/api/holidays/aus?year=2021&month=1&day=1");

    //then
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
