const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customerId: {
    // type: mongoose.Schema.Types.ObjectId, // Use the ObjectId type to reference the Customer schema
    type: String,
    // ref: "customer",
    unique: true,
  },
  items: [
    {
      productId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "product",
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // features: [
      //   {
      //     featureId: {
      //       type: String,
      //       required: true,
      //     },
      //     price: {
      //       type: Number,
      //       required: true,
      //     },
      //   },
      // ],
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
