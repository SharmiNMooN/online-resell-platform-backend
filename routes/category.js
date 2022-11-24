const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const { verifyJWT } = require("../jwt");
router.post("/", verifyJWT, categoryController.createCategory);
router.get("/", categoryController.getCategories);

module.exports = router;
