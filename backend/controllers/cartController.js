const Cart = require("../models/cart");

//// Fetch all carts
// const fetchCarts = async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.json({ carts });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Fetch a single cart by customerID
const fetchCart = async (req, res) => {
  try {
    const cart = await Cart.find({ customerId: req.params.customerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const cart = await Cart.create({
      userId,
      items,
    });
    res.json({ cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing cart by ID
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an existing cart by ID
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  // fetchCarts,
  fetchCart,
  createCart,
  updateCart,
  deleteCart,
};
