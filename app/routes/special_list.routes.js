module.exports = app => {
    const special_list = require("../controllers/special_list.controller.js");
    var router = require("express").Router();

    // Create a new special_list
    router.post("/", special_list.create);
    // Retrieve all special_list
    router.get("/", special_list.findAll);
    // Retrieve a single special_list with id
    router.get("/:id", special_list.findById);
    // Update a special_list with id
    router.put("/:id", special_list.update);
    // Delete a special_list with id
    router.delete("/:id", special_list.delete);

    app.use('/api/courses', router);
};