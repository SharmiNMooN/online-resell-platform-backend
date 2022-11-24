const mongose = require("mongoose");
const Schema = mongose.Schema;

const productSchema = new Schema(
  {
    name: { type: Schema.Types.String, trim: true, required: true },
    description: { type: Schema.Types.String, trim: true, required: true },
    sellingPrice: { type: Schema.Types.Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    purchasePrice: { type: Schema.Types.Number, required: true },
    yearOfPurchase: { type: Schema.Types.String },
    condition: {
      type: Schema.Types.String,
      enum: ["excellent", "good", "fair"],
      default: "fair",
      required: true,
    },
    image: { type: Schema.Types.String, trim: true, required: true },
    mobileNumber: { type: Schema.Types.String, trim: true },
    location: { type: Schema.Types.String, trim: true },

    status: {
      type: Schema.Types.String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("products", productSchema);
