const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
