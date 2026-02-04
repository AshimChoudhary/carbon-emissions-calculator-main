const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transport: {
    carKm: {
      type: Number,
      default: 0,
      min: 0,
    },
    flightKm: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  energy: {
    electricityKWh: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  diet: {
    beefMeals: {
      type: Number,
      default: 0,
      min: 0,
    },
    vegetarianMeals: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  emissions: {
    transport: {
      type: Number,
      default: 0,
    },
    energy: {
      type: Number,
      default: 0,
    },
    diet: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate emissions before saving
activitySchema.pre("save", function (next) {
  // Transport emissions
  const carEmissions = this.transport.carKm * 0.12; // Car (petrol): km × 0.12
  const flightEmissions = this.transport.flightKm * 0.255; // Flight (short-haul): km × 0.255
  this.emissions.transport = carEmissions + flightEmissions;

  // Energy emissions
  this.emissions.energy = this.energy.electricityKWh * 0.5; // Electricity: kWh × 0.5

  // Diet emissions
  const beefEmissions = this.diet.beefMeals * 6.0; // Beef meal: 6.0 kg
  const vegEmissions = this.diet.vegetarianMeals * 1.5; // Vegetarian meal: 1.5 kg
  this.emissions.diet = beefEmissions + vegEmissions;

  // Total emissions
  this.emissions.total =
    this.emissions.transport + this.emissions.energy + this.emissions.diet;

  next();
});

module.exports = mongoose.model("Activity", activitySchema);
