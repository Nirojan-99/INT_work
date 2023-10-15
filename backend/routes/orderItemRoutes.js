const express = require("express");
const router = express.Router();
const orderItemsController = require("../controllers/orderItemsController");

router.post("/", orderItemsController.createOrderItem);
router.get("/", orderItemsController.getOrderItems);
router.get("/:id", orderItemsController.getOrderItemsByOrderId);
// router.put("/:id", orderItemsController.updateOrder);
router.delete("/:id", orderItemsController.deleteOrderItem);

module.exports = router;
