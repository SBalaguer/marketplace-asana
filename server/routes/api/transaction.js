"use strict";

//This route will hold the logic for the user to change their name, email contact and picture.

const { Router } = require("express");
const mercadopago = require("mercadopago");

const bcryptjs = require("bcryptjs");

const transactionRouter = new Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

transactionRouter.post("/payment", async (req, res, next) => {
  const preference = {
    items: [
      {
        title: "Asana Test",
        unit_price: 100,
        quantity: 1
      }
    ],
    back_urls: {
      success: "https://www.tu-sitio/success",
      failure: "http://www.tu-sitio/failure",
      pending: "http://www.tu-sitio/pending"
    }
  };

  mercadopago.preferences
    .create(preference)
    .then(response => {
      //console.log(response);
      //res.redirect(`${response.body.sandbox_init_point}`);
      res.json({ response });
      // // Este valor reemplazará el string "$$init_point$$" en tu HTML
      // global.init_point = response.body.init_point;
    })
    .catch(error => {
      console.log(error);
    });
});

transactionRouter.post("/process-payment", (req, res, next) => {
  console.log("im being called");
  console.log(req);
});

transactionRouter.get("/process-payment", (req, res, next) => {
  console.log("im being called");
  console.log(req);
});

module.exports = transactionRouter;
