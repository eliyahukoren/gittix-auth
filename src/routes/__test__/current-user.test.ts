import request from "supertest";
import { app } from "../../app";

const urlSignUp: string = "/api/users/signup";
const urlCurrentUser: string = "/api/users/currentuser";
const BAD_REQUEST = 400;
const STATUS_OK = 200;
const STATUS_CREATED = 201;

const req = {
  validRequest: {
    email: "test@test.com",
    password: "password",
  }
};

it('response with details about the current user', async () => {
  await request(app)
    .post(urlSignUp)
    .send(req.validRequest)
    .expect(STATUS_CREATED);

  const response = await request(app)
    .get(urlCurrentUser)
    .send()
    .expect(STATUS_OK);

  console.log(response.body);
})
