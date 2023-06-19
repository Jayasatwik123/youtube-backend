import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, "	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODU2MThjODljZjc3NmM5MGMwMzhhYSIsImlhdCI6MTY4NjQ2MzY0NX0.FTH4X0JHScFsiA7zB3rxqyrUxk8AUxpIemJvfpoSjWk", (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};