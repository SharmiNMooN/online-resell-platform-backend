const productModel = require("../models/product");
const categoryModel = require("../models/category");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const payload = req.body;
      if (!payload.categoryId) {
        return res.status(400).send({
          success: false,
          message: "Category Id is required",
        });
      }

      const category = await categoryModel.findOne({ _id: payload.categoryId });
      if (!category) {
        return res.status(400).send({
          success: false,
          message: "Category Id is not valid",
        });
      }
      payload.sellerId = req.decoded.id;

      const product = await productModel.create(payload);
      console.log(`new product created...`, category);

      return res.send({
        success: true,
        message: "New product created",
        data: product,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const payload = req.body;
      const { productId } = req.params;

      const product = await productModel.findOne({ _id: productId });
      if (!product) {
        return res.status(400).send({
          success: false,
          message: "Product not found",
        });
      }

      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: product._id },
        payload,
        { new: true }
      );
      console.log(`product updated...`, updatedProduct);

      return res.send({
        success: true,
        message: "Product updated",
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const products = await productModel.find({
        categoryId,
        status: "available",
      });
      return res.send({
        success: true,
        message: "Products list...",
        data: products,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  getAdvertiesProduct: async (req, res) => {
    try {
      const products = await productModel.find({
        isAdvertised: true,
        status: "available",
      });
      return res.send({
        success: true,
        message: "Adverties prodcut list...",
        data: products,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
