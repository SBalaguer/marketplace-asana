"use strict";

//This route will hold the logic for the user to change their name, email contact and picture.

const { Router } = require("express");

const bcryptjs = require("bcryptjs");
const User = require("./../../models/user");

const userRouter = new Router();

//this will edit the user information

const uploader = require("./../../configuration/multer-configure");

userRouter.patch(
  "/edit",
  uploader.single("picture"),
  async (req, res, next) => {
    const userId = req.session.user;
    let picture;
    if (req.file) picture = req.file.url;
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...(picture ? { picture } : {})
        },
        { new: true }
      ).exec();
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

const userIsAdmin = require("./../../middleware/user-is-admin");

userRouter.delete("/delete", userIsAdmin, async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOneAndRemove({ email });
    res.json({
      type: "success",
      data: { message: `User with email ${user.email} has been deleted` }
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.session.user;
    const user = await User.findById(userId).exec();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
