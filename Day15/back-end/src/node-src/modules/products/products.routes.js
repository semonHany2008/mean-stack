import express from "express";
import {
  addproduct,
  deleteproduct,
  getproducts,
  getproduct,
  updateproduct,
  deletecategory,
  addcategory,
} from "./products.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

export const productsRoutes = express.Router();

productsRoutes.get("/products", verifyToken, verifyRole, getproducts);

productsRoutes.get("/product/:id", verifyToken, verifyRole, getproduct);

productsRoutes.post("/product", verifyToken, verifyRole, addproduct);

productsRoutes.post("/category", verifyToken, verifyRole, addcategory);

productsRoutes.put("/product/:id", verifyToken, verifyRole, updateproduct);

productsRoutes.delete("/product/:id", verifyToken, verifyRole, deleteproduct);

productsRoutes.delete(
  "/category/:name",
  verifyToken,
  verifyRole,
  deletecategory
);
