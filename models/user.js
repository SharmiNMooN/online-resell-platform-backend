const mongose = require("mongoose");
const Schema = mongose.Schema;

const userSchema = new Schema(
  {
    name: { type: Schema.Types.String, trim: true, required: true },
    email: { type: Schema.Types.String, trim: true, required: true },
    image: { type: Schema.Types.String, trim: true },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    status: {
      type: Schema.Types.String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("users", userSchema);
