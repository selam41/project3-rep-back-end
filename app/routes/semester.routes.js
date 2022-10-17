module.exports = (app) => {
  const semesters = require("../controllers/semester.controller.js");
  var router = require("express").Router();
  // Create a new semester
  router.post("/", semesters.create);
  // Retrieve all semesters
  router.get("/", semesters.findAll);
  // Retrieve all published semesters
  router.get("/published", semesters.findAllPublished);
  // Retrieve a single semester with id
  router.get("/:id", semesters.findOne);
  // Update a semester with id
  router.put("/:id", semesters.update);
  // Delete a semester with id
  router.delete("/:id", semesters.delete);
  // Delete all semester
  router.delete("/", semesters.deleteAll);
  app.use("/api/semesters", router);
};
