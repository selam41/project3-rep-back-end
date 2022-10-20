const db = require("../models");
const Special_list = db.special_list;
const Op = db.Sequelize.Op;

// Create and Save a new special_list
exports.create = (req, res) => {
  const special_list = {
    userId: req.params.userId,
    special_listId: req.params.special_listId
  };

  // Create and Save a new special_list
  Special_list.create(special_list)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the special_list."
      });
    });
};

// Retrieve all special_lists from the database
exports.findAll = (req, res) => {
  Special_list.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving special_lists."
      });
    });
};

// Retrieve a single special_list with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Special_list.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find special_list with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving special_list with id=' + id
      });
    });
};

// Update a special_list by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Special_list.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'special_list was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update special_list with id=' + id + '. Maybe special_list was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating special_list with id=' + id
    });
  });
};

// Delete a special_list with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Special_list.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'special_list was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete special_list with id=${id}. Maybe special_list was not found or '
      })
    }
  })
};