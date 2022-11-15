module.exports = app => {
    const faculitys = require("../controllers/faculity.controller");
    var router = require("express").Router();
    // Create a new course
    router.post("/", faculitys.create);
    // Retrieve all faculitys
    router.get("/", faculitys.findAll);
    // Retrieve all published faculitys
    router.get("/published", faculitys.findAllPublished);
    // Retrieve a single course with id
    router.get("/:id", faculitys.findOne);
    // Update a course with id
    router.put("/:id", faculitys.update);
    // Delete a course with id
    router.delete("/:id", faculitys.delete);
    // Delete all course
    router.delete("/", faculitys.deleteAll);
    app.use('/schedule-t6/faculitys', router);
  };