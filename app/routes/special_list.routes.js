module.exports = app => {
    const Special_lists = require("../controllers/special_list.controller");
    var router = require("express").Router();
    // Create a new Special_lists
    router.post("/", Special_lists.create);
    // Retrieve all Special_lists
    router.get("/", Special_lists.findAll);
    // Retrieve all published Special_lists
    router.get("/published", Special_lists.findAllPublished);
    // Retrieve a single Special_lists with id
    router.get("/:id", Special_lists.findOne);
    // Update a Special_lists with id
    router.put("/:id", Special_lists.update);
    // Delete a Special_lists with id
    router.delete("/:id", Special_lists.delete);
    // Delete all Special_lists
    router.delete("/", Special_lists.deleteAll);
    app.use('/api/special_lists', router);
  };