import server from "../src/app";
import CardModel from "../src/models/cardModel/card.model";
import supertest from "supertest";
import { dbClose, dbConnect, dbClear } from "../src/config/db";

beforeAll(async () => await dbConnect());
afterEach(async () => await dbClear());
afterAll(async () => await dbClose());

describe("Get The CardList Empty", () => {
  test("GET /api/v1/card", async () => {
    await supertest(server)
      .get("/api/v1/card")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(0);
      });
  });
});

describe("Get The CardList", () => {
  test("GET /api/v1/card", async () => {
    const card = await CardModel.create({
      cc_number: "Ali",
      name: "51234500000008",
    });

    await supertest(server)
      .get("/api/v1/card")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(1);

        expect(response.body.data[0].cc_number).toBe(card.cc_number);
        expect(response.body.data[0].name).toBe(card.name);
      });
  });
});

describe("Adding Card Success", () => {
  test("POST /api/v1/card", async () => {
    const body = {
      creditCardHolderName: "Maram",
      creditCardNumber: "51234500000008",
    };
    await supertest(server).post("/api/v1/card").send(body).expect(201);
  });
});

describe("Add Invalid Card Data", () => {
  test("POST /api/v1/card", async () => {
    const body = {
      cc_number: "Ali",
      name: "TestError",
    };

    await supertest(server).post("/api/v1/card").send(body).expect(422);
  });
});
