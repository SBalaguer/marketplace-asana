"use strict";

//This route will hold the logic to create and edit reviews

const { Router } = require("express");

const Review = require("./../../models/review");

const reviewRouter = new Router();

//CREATE A REVIEW

reviewRouter.post("/create", async (req, res, next) => {
  //body should contain: product, commment, raiting
  //we will prevent the usuer from commenting twice
  try {
    const { product, comment, rating } = req.body;
    const user = req.user._id;
    const reviewsInDb = await Review.find({ product, user }).exec();
    // console.log(reviewsInDb);
    if (!reviewsInDb.length) {
      //this means that the lenght is cero and the user did not review that product
      const newReview = await Review.create({ user, product, comment, rating });
      res.json({ newReview });
    } else {
      res.json({
        type: "error",
        data: { message: `User has already reviewed the product` }
      });
    }
  } catch (error) {
    next(error);
  }
});

//DELETE A REVIEW

reviewRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.findByIdAndRemove(reviewId);
    res.json({
      type: "success",
      data: { message: `Review has been deleted` }
    });
  } catch (error) {
    next(error);
  }
});

//MODIFIY A REVIEW

reviewRouter.patch("/edit/:id", async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const { comment, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        ...(comment ? { comment } : {}),
        ...(rating ? { rating } : {})
      },
      { new: true }
    ).exec();
    res.json({ updatedReview });
  } catch (error) {
    next(error);
  }
});

//READ ALL REVIEWS

reviewRouter.get("/all", async (req, res, next) => {
  try {
    const allReviews = await Review.find().exec();
    res.json(allReviews);
  } catch (error) {
    next(error);
  }
});

//READ ALL REVIEWS FOR A SPECIFIC PRODUCT

reviewRouter.get("/product/:id", async (req, res, next) => {
  try {
    const product = req.params.id;
    const reviewsForProduct = await Review.find({ product }).exec();
    //console.log(reviewsForProduct);
    const avgRating =
      reviewsForProduct.reduce((rating, review) => {
        return rating + review.rating;
      }, 0) / reviewsForProduct.length;
    //console.log(avgRating);
    res.json({ reviewsForProduct, avgRating });
  } catch (error) {
    next(error);
  }
});

//READ RATING FOR A SPECIFIC PRODUCT

reviewRouter.get("/product/rating/:id", async (req, res, next) => {
  try {
    const product = req.params.id;
    const reviewsForProduct = await Review.find({ product }).exec();
    //console.log(reviewsForProduct);
    const rating =
      reviewsForProduct.reduce((rating, review) => {
        return rating + review.rating;
      }, 0) / reviewsForProduct.length;
    //console.log(avgRating);
    res.json({ rating });
  } catch (error) {
    next(error);
  }
});

module.exports = reviewRouter;
