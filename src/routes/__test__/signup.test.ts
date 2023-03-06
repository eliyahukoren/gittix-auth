import request from "supertest";
import { app } from "../../app";

const url: string = "/api/users/signup";
const BAD_REQUEST = 400;
const STATUS_CREATED = 201;

const req = {
  validRequest: {
    email: "test@test.com",
    password: "password",
  },
  invalidEmail: {
    email: "invalidemail",
    password: "password",
  },
  invalidPassword: {
    email: "test@test.com",
    password: "p",
  },
  missingPassword: {
    email: "test@test.com",
  },
  missingEmail: {
    password: "password",
  },
};

it(`returns a ${STATUS_CREATED} on successful signup`, async () => {
  return request(app)
    .post(url)
    .send(req.validRequest)
    .expect(STATUS_CREATED);
});

it(`returns a ${BAD_REQUEST} with an invalid email`, async () => {
  return request(app)
    .post(url)
    .send(req.invalidEmail)
    .expect(BAD_REQUEST)
});

it(`returns a ${BAD_REQUEST} with an invalid password`, async () => {
  return request(app)
    .post(url)
    .send(req.invalidPassword)
    .expect(BAD_REQUEST);
});

it(`returns a ${BAD_REQUEST} with missing email and password`, async () => {
  await request(app)
    .post(url)
    .send(req.missingPassword)
    .expect(BAD_REQUEST);

  await request(app)
    .post(url)
    .send(req.missingEmail)
    .expect(BAD_REQUEST);
});
