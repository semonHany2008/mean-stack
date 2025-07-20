import { verifyRole } from "../../middlewares/verifyRole.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  getCarts,
  getCart,
  addProductToCart,
  updateCart,
  deleteCart,
  createCart,
  getCartProducts,
} from "./carts.controller.js";
import express from "express";

export const cartsRoutes = express.Router();

cartsRoutes.get("/carts", verifyToken, verifyRole, getCarts);

cartsRoutes.get("/cart", verifyToken, verifyRole, getCart);

cartsRoutes.get("/cart/products", verifyToken, verifyRole, getCartProducts);

cartsRoutes.post("/cart/:id", verifyToken, verifyRole, addProductToCart);

cartsRoutes.post("/cart", verifyToken, verifyRole, createCart);

cartsRoutes.put("/cart", verifyToken, verifyRole, updateCart);

cartsRoutes.delete("/cart", verifyToken, verifyRole, deleteCart);
