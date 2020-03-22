"use strict";

//This route will hold the logic for the user to change their name, email contact and picture.

const { Router } = require("express");
const mercadopago = require("mercadopago");

const bcryptjs = require("bcryptjs");
const User = require("./../../models/user");

const transactionRouter = new Router();

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

transactionRouter.post("/payment", async (req, res, next) => {
  console.log("im being called");
  console.log(req.body);
  const token = req.body.token;
  const payment_method_id = req.body.payment_method_id;
  const installments = req.body.installments;
  const issuer_id = req.body.issuer_id;

  const payment_data = {
    transaction_amount: 138,
    token: token,
    description: "Sleek Marble Watch",
    installments: installments,
    payment_method_id: payment_method_id,
    issuer_id: issuer_id,
    payer: {
      email: "koby@gmail.com"
    }
  };
  const payment = await mercadopago.payment.save(payment_data);
  console.log(payment);
});

module.exports = transactionRouter;
