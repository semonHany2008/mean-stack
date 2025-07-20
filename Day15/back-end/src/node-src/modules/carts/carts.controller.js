import { cartsModel } from "../../../DB/models/carts.model.js";
import { productsModel } from "../../../DB/models/products.model.js";

const getCarts = async (req, res) => {
  const carts = await cartsModel.find();
  res.json(carts);
};

const getCart = async (req, res) => {
  const cart = await cartsModel
    .findOne({ userId: req.user._id })
    .populate("userId");
  res.json(cart);
};

const updateCart = async (req, res) => {
  const updatedCart = await cartsModel.findOneAndUpdate(
    { userId: req.user._id },
    { $set: { ...req.body } },
    { new: true }
  );
  if (updatedCart)
    return res.json({ message: "cart updated successfully! ", updatedCart });
  res.status(400).end("error updating cart!");
};

const createCart = async (req, res) => {
  const insertedCart = await cartsModel.insertOne({
    userId: req.user._id,
    products: req.body,
  });
  if (insertedCart)
    return res
      .status(200)
      .json({ message: "cart created successfully!", insertedCart });
  res.status(400).end("failed to add the cart!");
};

const addProductToCart = async (req, res) => {
  let userCart = await cartsModel.findOne({ userId: req.user._id });
  console.log(userCart);
  let targetProduct = userCart.products.find(
    (product) => product.productId == req.params.id
  );
  if (targetProduct) {
    let newQuantity = ++targetProduct.quantity;
    let updatedcart = await cartsModel.findOneAndUpdate(
      { "products.productId": req.params.id },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true }
    );
    res.json({
      message: "product added to cart successfully!",
      newcartInfo: updatedcart,
    });
  } else {
    let updatedcart = await cartsModel.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { products: { productId: req.params.id } } },
      { new: true }
    );
    res.json({
      message: "product added to cart successfully!",
      newcartInfo: updatedcart,
    });
  }
};

const deleteCart = async (req, res) => {
  await cartsModel.findOneAndDelete({ userId: req.user._id });
  const carts = await cartsModel.find();
  return res.status(200).json({ message: "carts after deletion!", carts });
};

const getCartProducts = async (req, res) => {
  try {
    const userCart = await cartsModel.findOne({ userId: req.user._id });

    if (!userCart) {
      return res.status(404).end("Sorry, your cart doesn't exist!");
    }

    const products = [];

    for (let prod of userCart.products) {
      const result = await productsModel.findOne(
        { "products._id": prod._id },
        { "products.$": 1 }
      );

      if (result && result.products.length) {
        const productDetails = result.products[0];
        products.push({
          ...(productDetails.toObject?.() || productDetails),
          quantity: prod.quantity,
        });
      }
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getCarts,
  getCart,
  addProductToCart,
  updateCart,
  deleteCart,
  createCart,
  getCartProducts,
};
