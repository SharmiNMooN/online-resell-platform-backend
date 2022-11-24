const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);

module.exports = router;
