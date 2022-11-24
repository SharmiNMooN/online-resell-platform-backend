const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { verifyJWT } = require("../jwt");
const { authorisedRoles } = require("../authorisation");
router.post(
  "/",
  verifyJWT,
  authorisedRoles("seller"),
  productController.createProduct
);
router.get("/adverties", productController.getAdvertiesProduct);
router.get("/:categoryId", verifyJWT, productController.getProducts);
router.patch("/:productId", verifyJWT, productController.updateProduct);

module.exports = router;
