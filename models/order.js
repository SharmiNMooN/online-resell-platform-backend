const mongose = require("mongoose");
const Schema = mongose.Schema;

const orderSchema = new Schema(
  {
    buyingPrice: { type: Schema.Types.Number, required: true },
    customerId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },

    paymentStatus: {
      type: Schema.Types.String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
      required: true,
    },
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    image: { type: Schema.Types.String, trim: true, required: true },
    mobileNumber: { type: Schema.Types.String, trim: true },
    meetLocation: { type: Schema.Types.String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("orders", orderSchema);
