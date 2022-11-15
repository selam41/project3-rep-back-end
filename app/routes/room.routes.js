module.exports = app => {
  const rooms = require("../controllers/room.controller");
  var router = require("express").Router();
  // Create a new course
  router.post("/", rooms.create);
  // Retrieve all rooms
  router.get("/", rooms.findAll);
  // Retrieve all published rooms
  router.get("/published", rooms.findAllPublished);
  // Retrieve a single course with id
  router.get("/:id", rooms.findOne);
  // Update a course with id
  router.put("/:id", rooms.update);
  // Delete a course with id
  router.delete("/:id", rooms.delete);
  // Delete all course
  router.delete("/", rooms.deleteAll);
  app.use('/schedule-t6/rooms', router);
};