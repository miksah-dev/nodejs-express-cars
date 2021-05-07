const Car = require("../models/car.model.js");

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Car
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      modelyear: req.body.modelyear,
      color: req.body.color,
      chassis: req.body.chassis,
      doors: req.body.doors
    });
  
    // Save Car in the database
    Car.create(car, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Car."
        });
      else res.send(data);
    });
  };

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
    Car.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });
  };

// Find a single Car with a carId
exports.findOne = (req, res) => {
    Car.findById(req.params.carId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Car with id ${req.params.carId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Car with id " + req.params.carId
          });
        }
      } else res.send(data);
    });
  };

// Update a Car identified by the carId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Car.updateById(
      req.params.carId,
      new Car(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Car with id ${req.params.carId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Car with id " + req.params.carId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Car with the specified carId in the request
exports.delete = (req, res) => {
    Car.remove(req.params.carId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Car with id ${req.params.carId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Car with id " + req.params.carId
          });
        }
      } else res.send({ message: `Car was deleted successfully!` });
    });
  };


// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
    Car.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cars."
        });
      else res.send({ message: `All Cars were deleted successfully!` });
    });
  };