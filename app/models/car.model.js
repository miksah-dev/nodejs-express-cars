const sql = require("./db.js");

// constructor
const Car = function(car) {
  this.brand = car.brand;
  this.model = car.model;
  this.modelyear = car.modelyear;
  this.color = car.color;
  this.chassis = car.chassis;
  this.doors = car.doors;
};

Car.create = (newCar, result) => {
  sql.query("INSERT INTO cars SET ?", newCar, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created car: ", { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Car.findById = (carId, result) => {
  sql.query(`SELECT * FROM cars WHERE id = ${carId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found car: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Car with the id
    result({ kind: "not_found" }, null);
  });
};

Car.getAll = result => {
  sql.query("SELECT * FROM cars", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cars: ", res);
    result(null, res);
  });
};

Car.updateById = (id, car, result) => {
  sql.query(
    "UPDATE cars SET brand = ?, model = ?, modelyear = ?, color = ?, chassis = ?, doors = ? WHERE id = ?",
    [car.brand, car.model, car.modelyear, car.color, car.chassis, car.doors, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Car with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated car: ", { id: id, ...car });
      result(null, { id: id, ...car });
    }
  );
};

Car.remove = (id, result) => {
  sql.query("DELETE FROM cars WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Car with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted car with id: ", id);
    result(null, res);
  });
};

Car.removeAll = result => {
  sql.query("DELETE FROM cars", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cars`);
    result(null, res);
  });
};

module.exports = Car;