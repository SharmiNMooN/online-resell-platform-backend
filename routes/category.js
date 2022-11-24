const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const { authorisedRoles } = require("../authorisation");
const { verifyJWT } = require("../jwt");
router.post(
  "/",
  verifyJWT,
  authorisedRoles("admin"),
  categoryController.createCategory
);
router.get("/", categoryController.getCategories);

module.exports = router;
