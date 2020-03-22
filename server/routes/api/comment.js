"use strict";

//This route will hold the logic to create and edit comments

const { Router } = require("express");

const comments = require("./../../models/product");

const commentsRouter = new Router();

const userIsAdmin = require("./../../middleware/user-is-admin");

//CREATE A COMMENT

//EDIT A COMMENT

//DELETE A COMMENT

//GET ALL COMMENTS

//GET COMMENT FOR REVIEW


module.exports = commentsRouter;
