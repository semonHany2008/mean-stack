import { verifyRole } from "../../middlewares/verifyRole.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  getCarts,
  getCart,
  addCart,
  updateCart,
  deleteCart,
} from "./carts.controller.js";
import express from "express";

export const cartsRoutes = express.Router();

cartsRoutes.get("/carts", verifyToken, verifyRole, getCarts);

cartsRoutes.get("/cart", verifyToken, verifyRole, getCart);

cartsRoutes.post("/cart", verifyToken, verifyRole, addCart);

cartsRoutes.put("/cart", verifyToken, verifyRole, updateCart);

cartsRoutes.delete("/cart", verifyToken, verifyRole, deleteCart);
