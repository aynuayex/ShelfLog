const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    note: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Read", "Reading", "Completed"],
      default: "Read",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
