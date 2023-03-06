import express, { Request, Response } from "express";
import { validateBody } from "../middlewares/validate-body";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  validateBody("Email must be valid", "You must supply password"),
  validateRequest,
  (req: Request, res: Response) => {}
);

export { router as signInRouter };
