import request from "supertest";
import { app } from "../../app";

const urlSignUp: string = "/api/users/signup";
const urlCurrentUser: string = "/api/users/currentuser";
const STATUS_OK = 200;
const STATUS_CREATED = 201;

const req = {
  validRequest: {
    email: "test@test.com",
    password: "password",
  }
};

it('response with details about the current user', async () => {
  const authResponse = await request(app)
    .post(urlSignUp)
    .send(req.validRequest)
    .expect(STATUS_CREATED);

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get(urlCurrentUser)
    .set("Cookie", cookie)
    .send()
    .expect(STATUS_OK);

  expect(response.body.currentUser.email).toEqual(req.validRequest.email);
})
