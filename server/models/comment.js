"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    },
    comment: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);

module.exports = mongoose.model("Comment", schema);
