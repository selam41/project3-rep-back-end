module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();
  // Create a new course
  router.post("/", users.create);
  // Retrieve all roles
  router.get("/", users.findAll);
  // Retrieve all published roles
  router.get("/published", users.findAllPublished);
  // Retrieve a single course with id
  router.get("/:id", users.findOne);
  // Update a course with id
  router.put("/:id", users.update);
  // Delete a course with id
  router.delete("/:id", users.delete);
  // Delete all course
  router.delete("/", users.deleteAll);
  app.use('/api/roles', router);
};