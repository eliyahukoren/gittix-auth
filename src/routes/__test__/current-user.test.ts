import request from "supertest";
import { app } from "../../app";

const urlCurrentUser: string = "/api/users/currentuser";
const STATUS_OK = 200;

const req = {
  validRequest: {
    email: "test@test.com",
    password: "password",
  }
};

it('response with details about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get(urlCurrentUser)
    .set("Cookie", cookie)
    .send()
    .expect(STATUS_OK);

  expect(response.body.currentUser.email).toEqual(req.validRequest.email);
})
