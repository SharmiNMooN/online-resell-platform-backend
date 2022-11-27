const mongose = require("mongoose");
const Schema = mongose.Schema;

const paymentSchema = new Schema(
  {
    price: { type: Schema.Types.Number, required: true },
    transactionId: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    orderId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("payments", paymentSchema);
