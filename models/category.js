const mongose = require("mongoose");
const Schema = mongose.Schema;

const categorySchema = new Schema(
  {
    name: { type: Schema.Types.String, trim: true, required: true },
    description: { type: Schema.Types.String, trim: true, required: true },
    image: { type: Schema.Types.String, trim: true },

    status: {
      type: Schema.Types.String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("categories", categorySchema);
