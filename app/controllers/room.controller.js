const db = require("../models");
const Rooms = db.rooms;
const Op = db.Sequelize.Op;
// Create and Save a new rooms
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a room
  const room = {
    number: req.body.number,
    capacity: req.body.capacity,
  };
  // Save room in the database
  Rooms.create(room)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the room.",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Rooms.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms.",
      });
    });
};
// Find a single rooms with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Rooms.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find room with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room with id=" + id,
      });
    });
};
// Update a rooms by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Rooms.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "room was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update room with id=${id}. Maybe room was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating room with id=" + id,
      });
    });
};
// Delete a room with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Rooms.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "room was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete room with id=${id}. Maybe room was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete room with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Rooms.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} room were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all rooms.",
      });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Rooms.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms.",
      });
    });
};
