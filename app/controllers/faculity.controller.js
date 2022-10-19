const db = require("../models");
const Faculity = db.faculitys;
const Op = db.Sequelize.Op;
// Create and Save a new faculitys
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a faculity
  const faculity = {
    name: req.body.name,
    sectionId : req.body.sectionId
  };
  // Save faculity in the database
  Faculity.create(faculity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the faculity.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Faculity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving faculitys.",
      });
    });
};
// Find a single faculitys with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Faculity.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find faculity with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving faculity with id=" + id,
      });
    });
};
// Update a faculitys by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Faculity.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "faculity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update faculity with id=${id}. Maybe faculity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating faculity with id=" + id,
      });
    });
};
// Delete a faculity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Faculity.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "faculity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete faculity with id=${id}. Maybe faculity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete faculity with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Faculity.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} faculity were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all faculitys.",
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Faculity.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving faculitys.",
      });
    });
};
