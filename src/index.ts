import { json } from "body-parser";
import express from "express";
import 'express-async-errors';

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.use(json());

// define routes
app.use( currentUserRouter );
app.use( signInRouter );
app.use( signOutRouter );
app.use( signUpRouter );

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// define error handle middleware
app.use( errorHandler );

app.listen(3000, () => {
  console.log("Auth Now listening port 3000.");
});

