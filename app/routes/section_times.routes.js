module.exports = app => {
  const Section_times = require("../controllers/section_time.controller");
  var router = require("express").Router();
  // Create a new Section_times
  router.post("/", Section_times.create);
  // Retrieve all Section_times
  router.get("/", Section_times.findAll);
  // Retrieve all published Section_times
  router.get("/published", Section_times.findAllPublished);
  // Retrieve a single Section_times with id
  router.get("/:id", Section_times.findOne);
  // Update a Section_times with id
  router.put("/:id", Section_times.update);
  // Delete a Section_times with id
  router.delete("/:id", Section_times.delete);
  // Delete all Section_times
  router.delete("/", Section_times.deleteAll);
  app.use('/schedule-t6/section_times', router);
};