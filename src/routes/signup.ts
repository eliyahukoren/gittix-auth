import {
  BadRequestError, validateBody,
  validateRequest
} from "@tickets-ek/common";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

const router = express.Router();

router.post(
  "/api/users/signup",
  validateBody(
    "Email must be valid",
    "Password must be between 4 and 20 characters"
  ),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
