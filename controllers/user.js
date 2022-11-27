const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const orderModel = require("../models/order");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const payload = req.body;

      if (!payload.name || !payload.email) {
        return res.status(400).send({
          success: false,
          message: "validation error: Name and Email are required ",
        });
      }
      //find out user using email in databse
      const user = await userModel.findOne({
        email: payload.email,
      });

      //if find user from databse then  throw a bad req user already regiserd with email
      if (user) {
        return res.status(400).send({
          success: false,
          message: "user already registerd",
        });
      }
      const result = await userModel.create(payload);
      return res.status(201).send({
        success: true,
        message: "User registered succesfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const payload = req.body;

      if (!payload.email) {
        return res.status(400).send({
          success: false,
          message: "Email is required",
        });
      }

      //find out user using email in databse
      const user = await userModel.findOne({
        email: payload.email,
      });

      if (!user) {
        const user = await userModel.create(payload);

        const token = jwt.sign(
          {
            email: user?.email,
            name: user?.name,
            role: user?.role,
            id: user._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "2d",
          }
        );
        return res.status(200).send({
          success: true,
          message: "User logged in succesfully",
          data: { user, token },
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          role: user?.role,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2d",
        }
      );
      return res.status(200).send({
        success: true,
        message: "User logged in succesfully",
        data: { user, token },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getBuyers: async (req, res) => {
    try {
      const users = await userModel.find({
        role: "buyer",
      });

      return res.status(200).send({
        success: true,
        message: "Buyer user list",
        data: users,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  getMyBuyers: async (req, res) => {
    try {
      const sellerId = req.decoded.id;
      console.log({ sellerId });
      const users = await orderModel.aggregate([
        {
          $match: { sellerId: ObjectId(sellerId) },
        },

        {
          $lookup: {
            from: "users",
            localField: "customerId",
            foreignField: "_id",
            as: "users",
          },
        },
        { $unwind: "$users" },
        {
          $project: {
            orderId: "$_id",
            userName: "$users.name",
            userEmail: "$users.email",
            userImage: "$users.image",
            mobileNumber: 1,
            image: 1,
            meetLocation: 1,
            name: 1,
          },
        },
      ]);

      return res.status(200).send({
        success: true,
        message: "Buyer user list",
        data: users,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getSellers: async (req, res) => {
    try {
      const users = await userModel.find({
        role: "seller",
      });

      return res.status(200).send({
        success: true,
        message: "Seller user list",
        data: users,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.body;
      console.log({ userId });
      const user = await userModel.findOne({
        _id: userId,
      });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "User not found",
        });
      }

      const deletedUser = await userModel.findOneAndRemove({ _id: userId });
      console.log(deletedUser);

      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
