const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyJWT } = require("../jwt");
const { authorisedRoles } = require("../authorisation");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get(
  "/buyers",
  verifyJWT,
  authorisedRoles("admin"),
  userController.getBuyers
);

router.get(
  "/my-buyers",
  verifyJWT,
  authorisedRoles("seller"),
  userController.getMyBuyers
);

router.get(
  "/sellers",
  verifyJWT,
  authorisedRoles("admin"),
  userController.getBuyers
);

router.delete(
  "/delete-user",
  verifyJWT,
  authorisedRoles("admin"),
  userController.deleteUser
);

module.exports = router;
