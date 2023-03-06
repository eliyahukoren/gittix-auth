import request from "supertest";
import { app } from "../../app";

const urlSignOut: string = "/api/users/signout";
const urlSignUp: string = "/api/users/signup";
const BAD_REQUEST = 400;
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const req = {
  validRequest: {
    email: "test@test.com",
    password: "password",
  }
};

it("clears the cookie after signing out", async () => {
  await request(app)
    .post(urlSignUp)
    .send(req.validRequest)
    .expect(STATUS_CREATED);

  const response = await request(app)
    .post(urlSignOut)
    .send({})
    .expect(STATUS_OK);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );

})
