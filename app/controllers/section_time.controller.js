const db = require("../models");
const Section_times = db.section_times;
const Op = db.Sequelize.Op;
// Create and Save a new section_times
exports.create = (req, res) => {
  // Validate request
  if (!req.body.inst_methode) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a section_time
  const section_time = {
    inst_methode: req.body.inst_methode,
    date_of_weak: req.body.date_of_weak,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    roomId: req.body.roomId,
    sectionId: req.body.sectionId
  };
  console.log("section_time"  , section_time)
  // Save section_time in the database
  Section_times.create(section_time)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the section_time.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Section_times.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving section_times.",
      });
    });
};
// Find a single section_times with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Section_times.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find section_time with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving section_time with id=" + id,
      });
    });
};
// Update a section_times by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Section_times.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "section_time was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update section_time with id=${id}. Maybe section_time was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating section_time with id=" + id,
      });
    });
};
// Delete a section_time with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Section_times.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "section_time was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete section_time with id=${id}. Maybe section_time was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete section_time with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Section_times.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} section_time were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all section_times.",
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Section_times.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving section_times.",
      });
    });
};
