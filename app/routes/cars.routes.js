module.exports = app => {
  const cars = require("../controllers/car.controller.js");

  // Create a new Car
  app.post("/cars", cars.create);

  // Retrieve all Car
  app.get("/cars", cars.findAll);

  // Retrieve a single Car with carId
  app.get("/cars/:carId", cars.findOne);

  // Update a Car with carId
  app.put("/cars/:carId", cars.update);

  // Delete a Car with carId
  app.delete("/cars/:carId", cars.delete);

  // Create a new Car
  app.delete("/cars", cars.deleteAll);
};
