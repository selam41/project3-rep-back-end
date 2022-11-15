module.exports = app => {
  const courses = require("../controllers/course.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve all Courses for user
  //router.get("/userTut/:userId", [authenticate], courses.findAllForUser);

  // Retrieve all published Courses
  router.get("/published", [authenticate], courses.findAllPublished);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Update a Course with id
  router.put("/:id", courses.update);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  // Delete all Courses
  router.delete("/", [authenticate], courses.deleteAll);

  app.use('/schedule-t6/courses', router);
};