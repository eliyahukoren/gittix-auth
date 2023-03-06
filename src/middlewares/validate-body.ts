import { body } from "express-validator";

export const validateBody = (
  emailErrorMessage: string, passwordErrorMessage: string
) => {
  return [
    body("email")
      .isEmail()
      .withMessage(emailErrorMessage),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(passwordErrorMessage),
  ];

  //   body("password").trim().notEmpty().withMessage("You must supply password")),

};
