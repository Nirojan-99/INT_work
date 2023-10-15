const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: String,
  orderDate: Date,
  // products: [
  //   {
  //     productId: Number,
  //     quantity: Number,
  //   },
  // ],
  orderTotal: Number,
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
