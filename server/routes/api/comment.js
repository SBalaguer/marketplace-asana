"use strict";

//This route will hold the logic to create and edit comments

const { Router } = require("express");

const Comment = require("./../../models/comment");

const commentsRouter = new Router();

const userIsAdmin = require("./../../middleware/user-is-admin");

//CREATE A COMMENT
commentsRouter.post("/create", userIsAdmin, async (req, res, next) => {
  //We will allow only one comment per review.
  try {
    const { review, comment } = req.body;
    const reviewInComments = await Comment.find({ review }).exec();
    if (!reviewInComments.length) {
      const newComment = await Comment.create({ review, comment });
      res.json({ newComment });
    } else {
      res.json({
        type: "error",
        data: { message: `Admin has already commented this review` }
      });
    }
  } catch (error) {
    next(error);
  }
});

//EDIT A COMMENT
commentsRouter.patch("/edit/:id", userIsAdmin, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;
    if (comment) {
      const editedComment = await Comment.findByIdAndUpdate(
        commentId,
        { comment },
        { new: true }
      ).exec();
      res.json({ editedComment });
    }
  } catch (error) {
    next(error);
  }
});

//DELETE A COMMENT
commentsRouter.delete("/delete/:id", userIsAdmin, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.json({
      type: "success",
      data: { message: `Comment has been deleted` }
    });
  } catch (error) {
    next(error);
  }
});

//GET ALL COMMENTS
commentsRouter.get("/all", async (req, res, next) => {
  try {
    const allComments = await Comment.find().exec();
    res.json({ allComments });
  } catch (error) {
    next(error);
  }
});

//GET COMMENT FOR REVIEW
commentsRouter.get("/review/:id", async (req, res, next) => {
  try {
    const review = req.params.id;
    const commentInReview = await Comment.find({ review }).exec();
    res.json({ commentInReview });
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
