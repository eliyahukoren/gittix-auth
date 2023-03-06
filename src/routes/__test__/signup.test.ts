import request from "supertest";
import { app } from "../../app";

const url: string = "/api/users/signup";
const BAD_REQUEST = 400;
const STATUS_CREATED = 201;

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post(url)
    .send({
      email: "invalidemail",
      password: "password"
    })
    .expect(400)
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "pas",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post(url)
    .send({ email: "test@test.com"})
    .expect(400);

  await request(app)
    .post(url)
    .send({ password: "password" })
    .expect(400);
});
