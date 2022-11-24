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

module.exports = router;
