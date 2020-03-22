"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    charged: {
      type: Boolean
    },
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
    }
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);

module.exports = mongoose.model("Transaction", schema);
