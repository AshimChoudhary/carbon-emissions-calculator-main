// Import required packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./backend/config/db");
const errorHandler = require("./backend/middleware/errorHandler");

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

var corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Define middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/auth", require("./backend/routes/auth"));
app.use("/api/activities", require("./backend/routes/activities"));
app.use("/api/ai", require("./backend/routes/ai"));

// Keep legacy calculator endpoint for backward compatibility
app.post("/calculate", (req, res) => {
  try {
    // Get input data from the request body
    const {
      electricityUsageKWh,
      transportationUsageGallonsPerMonth,
      flightsShortHaul,
      flightsMediumHaul,
      flightsLongHaul,
      dietaryChoice,
    } = req.body;

    // Constants for emission factors and conversion factors
    const electricityFactor = 0.3978;
    const transportationFactor = 9.087;
    const kgCO2ePerYearFactor = 12;
    const airTravelFactorShortHaul = 100;
    const airTravelFactorMediumHaul = 200;
    const airTravelFactorLongHaul = 300;
    const dietaryFactors = {
      Vegan: 200,
      Vegetarian: 400,
      Pescatarian: 600,
      MeatEater: 800,
    };

    // Calculate CO2 emissions for electricity and transportation
    const electricityEmissions = electricityUsageKWh * electricityFactor;
    const transportationEmissions =
      transportationUsageGallonsPerMonth * transportationFactor;

    // Calculate air travel emissions for each type of flight
    const airTravelEmissionsShortHaul =
      flightsShortHaul * airTravelFactorShortHaul;
    const airTravelEmissionsMediumHaul =
      flightsMediumHaul * airTravelFactorMediumHaul;
    const airTravelEmissionsLongHaul =
      flightsLongHaul * airTravelFactorLongHaul;

    // Calculate dietary choice emissions
    const dietaryChoiceEmissions = dietaryFactors[dietaryChoice] || 0;

    // Calculate total air travel emissions
    const totalAirTravelEmissions =
      airTravelEmissionsShortHaul +
      airTravelEmissionsMediumHaul +
      airTravelEmissionsLongHaul;

    // Calculate yearly totals based on monthly inputs
    const yearlyElectricityEmissions =
      electricityEmissions * kgCO2ePerYearFactor;
    const yearlyTransportationEmissions =
      transportationEmissions * kgCO2ePerYearFactor;

    // Calculate total yearly CO2 emissions
    const totalYearlyEmissions =
      yearlyElectricityEmissions +
      yearlyTransportationEmissions +
      totalAirTravelEmissions +
      dietaryChoiceEmissions;

    // Prepare response object with units included
    const result = {
      electricityEmissions: { value: electricityEmissions, unit: "kgCO2e" },
      transportationEmissions: {
        value: transportationEmissions,
        unit: "kgCO2e",
      },
      airTravelEmissionsShortHaul: {
        value: airTravelEmissionsShortHaul,
        unit: "kgCO2e/year",
      },
      airTravelEmissionsMediumHaul: {
        value: airTravelEmissionsMediumHaul,
        unit: "kgCO2e/year",
      },
      airTravelEmissionsLongHaul: {
        value: airTravelEmissionsLongHaul,
        unit: "kgCO2e/year",
      },
      totalAirTravelEmissions: {
        value: totalAirTravelEmissions,
        unit: "kgCO2e/year",
      },
      yearlyElectricityEmissions: {
        value: yearlyElectricityEmissions,
        unit: "kgCO2e/year",
      },
      yearlyTransportationEmissions: {
        value: yearlyTransportationEmissions,
        unit: "kgCO2e/year",
      },
      dietaryChoiceEmissions: {
        value: dietaryChoiceEmissions,
        unit: "kgCO2e/year",
      },
      totalYearlyEmissions: {
        value: totalYearlyEmissions,
        unit: "kgCO2e/year",
      },
    };

    // Send the result as JSON response
    res.json(result);
  } catch (err) {
    console.error("Error calculating CO2 emissions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
