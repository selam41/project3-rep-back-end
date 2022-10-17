module.exports = app => {
    const sections = require("../controllers/section.controller");
    var router = require("express").Router();
    // Create a new course
    router.post("/", sections.create);
    // Retrieve all sections
    router.get("/", sections.findAll);
    // Retrieve all published sections
    router.get("/published", sections.findAllPublished);
    // Retrieve a single course with id
    router.get("/:id", sections.findOne);
    // Update a course with id
    router.put("/:id", sections.update);
    // Delete a course with id
    router.delete("/:id", sections.delete);
    // Delete all course
    router.delete("/", sections.deleteAll);
    app.use('/api/sections', router);
  };