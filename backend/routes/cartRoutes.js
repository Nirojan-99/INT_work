const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:customerId", cartController.fetchCart);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
