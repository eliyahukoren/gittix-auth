import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { validateBody } from "../middlewares/validate-body";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/users";
import { Password } from "../services/password";

const router = express.Router();

const messages = {
  invalidEmail: "Email must be valid",
  invalidPassword: "You must supply password",
  invalidCredentials: "Invalid credentials",
};

router.post(
  "/api/users/signin",
  validateBody(messages.invalidEmail, messages.invalidPassword),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!existUser) throw new BadRequestError(messages.invalidCredentials);

    const passwordMatch = await Password.compare(existUser.password, password);

    if (!passwordMatch) throw new BadRequestError(messages.invalidCredentials);

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existUser);
  }
);

export { router as signInRouter };
