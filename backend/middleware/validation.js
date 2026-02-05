const validateActivity = (req, res, next) => {
  const { transport, energy, diet } = req.body;

  // Validate transport
  if (transport) {
    if (
      transport.carKm !== undefined &&
      (transport.carKm < 0 || isNaN(transport.carKm))
    ) {
      return res
        .status(400)
        .json({ message: "Car km must be a positive number" });
    }
    if (
      transport.flightKm !== undefined &&
      (transport.flightKm < 0 || isNaN(transport.flightKm))
    ) {
      return res
        .status(400)
        .json({ message: "Flight km must be a positive number" });
    }
  }

  // Validate energy
  if (energy) {
    if (
      energy.electricityKWh !== undefined &&
      (energy.electricityKWh < 0 || isNaN(energy.electricityKWh))
    ) {
      return res
        .status(400)
        .json({ message: "Electricity kWh must be a positive number" });
    }
  }

  // Validate diet
  if (diet) {
    if (
      diet.beefMeals !== undefined &&
      (diet.beefMeals < 0 || isNaN(diet.beefMeals))
    ) {
      return res
        .status(400)
        .json({ message: "Beef meals must be a positive number" });
    }
    if (
      diet.vegetarianMeals !== undefined &&
      (diet.vegetarianMeals < 0 || isNaN(diet.vegetarianMeals))
    ) {
      return res
        .status(400)
        .json({ message: "Vegetarian meals must be a positive number" });
    }
  }

  next();
};

module.exports = { validateActivity };
