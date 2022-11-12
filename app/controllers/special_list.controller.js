const db = require("../models");
const Special_list = db.special_lists;
const Op = db.Sequelize.Op;
// Create and Save a new sections
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }
  // Create a special_list
  const special_list = {
    
    userId: req.body.userId,
    courseId: req.body.courseId,
  };
  // Save special_list in the database
  Special_list.create(special_list)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the special_list.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Special_list.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections.",
      });
    });
};
// Find a single sections with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Special_list.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find special_list with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving special_list with id=" + id,
      });
    });
};
// Update a sections by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Special_list.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "special_list was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update special_list with id=${id}. Maybe special_list was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating special_list with id=" + id,
      });
    });
};
// Delete a special_list with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Special_list.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "special_list was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete special_list with id=${id}. Maybe special_list was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete special_list with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Special_list.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} special_list were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sections.",
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Special_list.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections.",
      });
    });
};