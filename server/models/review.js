"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comment: {
      type: String
    },
    rating: {
      type: Number
    }
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);

module.exports = mongoose.model("Review", schema);
