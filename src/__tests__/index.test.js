import supertest from "supertest";
import app from "../app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const client = supertest(app);

describe("Testing the environment", () => {
  beforeAll(async () => {
    console.log("Running before all the tests in the suite");
    // We are going to connect to the database.

    expect(process.env.MONGO_URL_TEST).toBeDefined();
    await mongoose.connect(process.env.MONGO_URL_TEST);
  });

  // the keyword for our tests are two (interchangeable)
  // "it" or "test"

  it("should test that true is true", () => {
    expect(true).toBe(true);
  });

  it("should test that the GET /api/test endpoint returns a success message", async () => {
    const response = await client.get("/api/test");

    /**
     * The expected response status is 200 and the body is:
     * {
     *  message: "Test successful"
     * }
     */

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Test successful");
  });

  let validProduct = {
    name: "hair",
    price: 999,
    description: "This is a test product",
  };

  const invalidProduct = {
    name: "invalid product",
  };

  const notFound = {
    name: "product not found",
  };
  const correctID = {
    _id: "6296214ec72cdba4468acee6",
  };

  it("should test that the POST /api/products endpoint returns a valid product", async () => {
    const response = await client.post("/api/products").send(validProduct);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
  });

  it("should check that the POST /api/products endpoint returns 400 when an invalid product", async () => {
    const response = await client.post("/api/products").send(invalidProduct);

    expect(response.status).toBe(400);
  });

  it("should test that the GET /api/products endpoint returns the existing products", async () => {
    const response = await client.get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe(validProduct.name);
  });

  it("shoud test not find the corresponding product in GET /api/products/:id", async () => {
    const response = await client
      .get("/api/products/6296214ec72cdba4468acee6")
      .send(notFound);

    expect(response.status).toBe(404); // ????????????????????????????????????
  });

  it("should test that the GET /api/products/:id endpoint returns the existing product", async () => {
    const response = await client.get("/api/products/6296214ec72cdba4468acee6");

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(correctID._id);
  });

  afterAll(async () => {
    console.log("Running after all the tests in the suite");
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
