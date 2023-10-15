const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "sports glasses",
      "fashion glasses",
      "computer glasses",
      "sun glasses",
    ],
    // required: true,
  },
  // features: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Feature",
  //   },
  // ],
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: [
    {
      type: String,
      required: true,
    },
  ],
  availableStock: {
    type: Number,
    // required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
