import request from "supertest";
import { app } from "../../app";

const urlSignIn: string = "/api/users/signin";
const urlSignUp: string = "/api/users/signup";
const BAD_REQUEST = 400;
const STATUS_OK = 200;
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
    password: "psd333333",
  },
  missingPassword: {
    email: "test@test.com",
  },
  missingEmail: {
    password: "password",
  },
};

it(`fails when a email that does not exist is supplied`, async () => {
  await request(app)
    .post(urlSignIn)
    .send(req.validRequest)
    .expect(BAD_REQUEST);
});

it(`fails when an incorrect password is supplied`, async () => {
  await request(app)
    .post(urlSignUp)
    .send(req.validRequest)
    .expect(STATUS_CREATED);

  await request(app)
    .post(urlSignIn)
    .send(req.invalidPassword)
    .expect(BAD_REQUEST);
});

it(`responds with a cookie when given valid credentials`, async () => {
  await request(app)
    .post(urlSignUp)
    .send(req.validRequest)
    .expect(STATUS_CREATED);

  await request(app)
    .post(urlSignIn)
    .send(req.validRequest)
    .expect(STATUS_OK);
});
