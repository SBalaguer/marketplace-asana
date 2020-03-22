"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    size: {
      type: String,
      trim: true,
      required: true
    },
    picture: [
      {
        type: String
      }
    ],
    price: {
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        enum: ["ARS", "USD", "EUR"],
        required: true
      }
    },
    stock: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);

module.exports = mongoose.model("Product", schema);
