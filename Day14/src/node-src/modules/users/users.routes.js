import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  signIn,
  updateUser,
} from "./users.controller.js";
import { checkEmail } from "../../middlewares/checkEmailToPost.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

export const usersRoutes = express.Router();

usersRoutes.get("/users", verifyToken, verifyRole, getUsers);

usersRoutes.post("/user", verifyToken, verifyRole, checkEmail, addUser);

usersRoutes.post("/signUp", addUser);

usersRoutes.post("/signIn", signIn);

usersRoutes.put("/user/:id", verifyToken, verifyRole, updateUser); //:id make this id dynamic with its all possible values

usersRoutes.delete("/user/:id", verifyToken, verifyRole, deleteUser);

//call for the functions here must be a reference (without brackets).
