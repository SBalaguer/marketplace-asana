"use strict";

//This route will hold the logic to create and edit products

const { Router } = require("express");

const Product = require("./../../models/product");

const productRouter = new Router();

const userIsAdmin = require("./../../middleware/user-is-admin");

//CREATE A PRODUCT//
//INFO NEEDED: Name, Size, Picture [], Price {amout, currency}, Stock

productRouter.post("/create", userIsAdmin, async (req, res, next) => {
  const { name, size, amount, currency, stock } = req.body;
  const newProduct = {
    name,
    size,
    price: {
      amount,
      currency
    },
    stock
  };
  try {
    const productCreated = await Product.create(newProduct);
    res.json({ productCreated });
  } catch (error) {
    next(error);
  }
});

//UPDATE A PRODUCT

productRouter.patch("/edit/:id", userIsAdmin, async (req, res, next) => {
  const productId = req.params.id;
  const { name, size, amount, currency, stock } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...(name ? { name } : {}),
        ...(size ? { size } : {}),
        ...(stock ? { stock } : {}),
        ...(amount ? { amount } : {}),
        ...(currency ? { currency } : {})
      },
      { new: true }
    ).exec();
    res.json({ updatedProduct });
  } catch (error) {
    //console.log(error);
    next(error);
  }
});

//DELETE A PRODUCT

productRouter.delete("/delete/:id", userIsAdmin, async (req, res, next) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId).exec();
    res.json({
      type: "success",
      data: { message: `Product ${deletedProduct.name} has been deleted` }
    });
  } catch (error) {
    next(error);
  }
});

//READ FOR ALL PRODUCTS

productRouter.get("/all", async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

//READ FOR A PRODUCT

productRouter.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).exec();
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;