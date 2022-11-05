const db = require("../models");
const Section = db.sections;
const Op = db.Sequelize.Op;
// Create and Save a new Section
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Section
  const section = {
    courseId: req.params.courseId,
    title: req.body.title,
    number: req.body.number
  };
  // Save Section in the database
  Section.create(section)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Section."
      });
    });
};
// Retrieve all Sections from the database.
exports.findAll = (req, res) => {
  const sectionId = req.query.sectionId;
  var condition = sectionId ? {
    sectionId: {
      [Op.like]: `%${sectionId}%`
    }
  } : null;

  Section.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};
// Retrieve all Sections for a course from the database.
exports.findAllForCourse = (req, res) => {
  const courseId = req.params.courseId;

  Section.findAll({ where: { courseId: courseId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};
// Find a single Section with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Section.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Section with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Section with id=" + id
      });
    });
};
// Update a Section by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Section.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Section was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Section with id=${id}. Maybe Section was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Section with id=" + id
      });
    });
};
// Delete a Section with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Section.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Section was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Section with id=${id}. Maybe Section was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Section with id=" + id
      });
    });
};
// Delete all Sections from the database.
exports.deleteAll = (req, res) => {
  Section.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sections were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sections."
      });
    });
};
// Find all published Sections
exports.findAllPublished = (req, res) => {
  const sectionId = req.query.sectionId;

  Section.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};