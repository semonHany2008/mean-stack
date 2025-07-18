import { cartsModel } from "../../../DB/models/carts.model.js";

const getCarts = async (req, res) => {
  const carts = await cartsModel.find();
  res.json(carts);
};

const getCart = async (req, res) => {
  const cart = await cartsModel
    .find({ userId: req.user._id })
    .populate("userId");
  res.json(cart);
};

const updateCart = async (req, res) => {
  const updatedCart = await cartsModel.findOneAndUpdate(
    { userId: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (updatedCart)
    return res.json({ message: "cart updated successfully! ", updatedCart });
  res.status(400).end("error updating cart!");
};

const addCart = async (req, res) => {
  const insertedCart = await cartsModel.insertOne(req.body);
  if (insertedCart)
    return res
      .status(200)
      .json({ message: "cart added successfully!", insertedCart });
  res.status(400).end("failed to add the cart!");
};

const deleteCart = async (req, res) => {
  await cartsModel.findOneAndDelete({ userId: req.user._id });
  const carts = await cartsModel.find();
  return res.status(200).json({ message: "carts after deletion!", carts });
};

export { getCarts, getCart, addCart, updateCart, deleteCart };
