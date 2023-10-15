const OrderItem = require("../models/orderItems");

const createOrderItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const orderItem = new OrderItem({ productId, quantity });
    await orderItem.save();
    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = await Order.find({ orderId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOrderItems,
  createOrderItem,
  deleteOrderItem,
  getOrderItemsByOrderId,
};
