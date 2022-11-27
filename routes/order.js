const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { verifyJWT } = require("../jwt");
const { authorisedRoles } = require("../authorisation");
router.post(
  "/",
  verifyJWT,
  authorisedRoles("buyer"),
  orderController.createOrder
);

router.get(
  "/my-orders",
  verifyJWT,
  authorisedRoles("buyer"),
  orderController.getMyOrders
);

router.get("/:orderId", verifyJWT, orderController.getOrder);

module.exports = router;
