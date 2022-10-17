const db = require("../models");
const Section = db.sections;
const Op = db.Sequelize.Op;
// Create and Save a new sections
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a section
  const section = {
    title: req.body.title,
    number: req.body.number,
    courseId: req.body.courseId,
    semesterId: req.body.semesterId,
  };
  // Save section in the database
  Section.create(section)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the section.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Section.findAll({ where: condition })
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
  Section.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find section with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section with id=" + id,
      });
    });
};
// Update a sections by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Section.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "section was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update section with id=${id}. Maybe section was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating section with id=" + id,
      });
    });
};
// Delete a section with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Section.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "section was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete section with id=${id}. Maybe section was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete section with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Section.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} section were deleted successfully!` });
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
  Section.findAll({ where: { published: true } })
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
