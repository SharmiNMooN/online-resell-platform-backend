const productModel = require("../models/product");
const orderModel = require("../models/order");
const paymentModel = require("../models/payment");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
module.exports = {
  createOrder: async (req, res) => {
    try {
      const payload = req.body;
      payload.customerId = req.decoded.id;

      if (!payload.productId || !payload.sellerId) {
        return res.status(400).send({
          success: false,
          message: "Product Id, Seller Id are required",
        });
      }

      const product = await productModel.findOne({ _id: payload.productId });
      if (!product) {
        return res.status(400).send({
          success: false,
          message: "product Not Found",
        });
      }

      const order = await orderModel.create(payload);
      await productModel.findOneAndUpdate(
        { _id: product._id },
        {
          status: "sold",
        }
      );

      console.log(`new order created...`, order);

      return res.send({
        success: true,
        message: "New order placed",
        data: order,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const orders = await orderModel.find({ customerId: req.decoded.id });

      return res.send({
        success: true,
        message: "My orders",
        data: orders,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getOrder: async (req, res) => {
    try {
      const orders = await orderModel.findOne({
        _id: req.params.orderId,
      });

      return res.send({
        success: true,
        message: "Order details",
        data: orders,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  createPaymentIntent: async (req, res) => {
    const order = req.body;
    const price = order.price;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });
    return res.send({
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
    });
  },

  payment: async (req, res) => {
    const payment = req.body;
    const result = await paymentModel.create(payment);

    await orderModel.findOneAndUpdate(
      { _id: payment.orderId },
      {
        paymentStatus: "paid",
        transactionId: payment.transactionId,
      },
      { new: true }
    );
    return res.send({
      success: true,
      data: result,
    });
  },
};
