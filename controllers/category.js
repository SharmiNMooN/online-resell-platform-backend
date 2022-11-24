const categoryModel = require("../models/category");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const payload = req.body;

      const category = await categoryModel.create(payload);
      console.log(`new category created...`, category);

      return res.send({
        success: true,
        message: "New category created",
        data: category,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      return res.send({
        success: true,
        message: "Category list...",
        data: categories,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
