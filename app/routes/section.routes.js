module.exports = app => {
  const sections = require("../controllers/section.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/sections", sections.findAll);
  // Create a new Section for a Tutorial
  router.post("/:courseId/sections/", sections.create);

  // Retrieve all Sections for a Tutorial
  router.get("/:courseId/sections/", sections.findAllForCourse);

  // Retrieve all published Sections for a Tutorial
  router.get("/:courseId/sections/published", sections.findAllPublished);

  // Retrieve a single Section with id
  router.get("/:courseId/sections/:id", sections.findOne);

  // Update a Section with id
  router.put("/:courseId/sections/:id", sections.update);

  // Delete a Section with id
  router.delete("/:courseId/sections/:id", sections.delete);

  // Delete all Sections
  router.delete("/:courseId/sections/:id", sections.deleteAll);

  app.use('/schedule-t6/course', router);
};